import type { Context } from 'hono'
import type { SignOptions } from 'jsonwebtoken'
import { HTTPException } from 'hono/http-exception'
import { setCookie, getCookie } from 'hono/cookie'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import z from 'zod'
import _ from 'lodash'

import User from '@/lib/db/User'
import Account from '@/lib/db/Account'
import Access from '@/lib/db/Access'

const schema = z.object({
    companyCode: z.string().nonempty(),
})

const invalidLogin = new HTTPException(StatusCodes.UNAUTHORIZED, {
    message: 'Invalid user or account',
})

const verifyAuthToken = (c: Context) => {
    const authToken = getCookie(c, 'auth-token')

    if (!authToken) {
        throw invalidLogin
    }

    try {
        type TokenPayload = {
            username: string
        }

        const payload = jwt.verify(
            authToken,
            process.env.AUTH_TOKEN_SECRET as string,
        ) as TokenPayload

        return payload
    } catch {
        throw invalidLogin
    }
}

const verifyAccess = async (username: string, companyCode: string) => {
    const access = await Access.findOne({
        include: [
            {
                model: User,
                as: 'user',
                required: true,
                where: { username },
            },
            {
                model: Account,
                as: 'account',
                required: true,
                where: { companyCode },
            },
        ],
    })

    if (!access || !access.user || !access.account) {
        throw invalidLogin
    }

    return {
        user: access.user,
        account: access.account,
    }
}

const setAccessTokenCookie = (c: Context, user: User, account: Account) => {
    const jwtPayload = {
        user: _.pick(user, [
            'id',
            'role',
            'username',
            'firstName',
            'middleName',
            'lastName',
        ]),
        account: _.pick(account, [
            'id',
            'type',
            'companyCode',
            'name',
            'type',
            'address',
        ]),
    }

    const accessToken = jwt.sign(
        jwtPayload,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env
                .ACCESS_TOKEN_VALIDITY as SignOptions['expiresIn'],
        },
    )

    const match = (process.env.ACCESS_TOKEN_VALIDITY as string).match(
        /^(\d+)([A-Za-z])$/,
    )

    if (!match) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Invalid access token validity',
        })
    }

    const [amount, unit] = match as [
        moment.DurationInputArg1,
        moment.DurationInputArg2,
    ]

    const accessTokenExpiry = moment().add(unit, Number(amount))
    const isProd = process.env.NODE_ENV === 'production'

    const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
        expires: accessTokenExpiry.toDate(),
    }

    setCookie(c, 'access-token', accessToken, cookieOptions)
}

export default async (c: Context) => {
    const body = await c.req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: ReasonPhrases.BAD_REQUEST,
            cause: parsed.error.issues,
        })
    }

    /**
     * Verify authentication token.
     *
     * This returns a payload containing the username.
     */

    const { companyCode } = parsed.data
    const { username } = verifyAuthToken(c)

    /**
     * Verify access.
     *
     * This returns the user and account record.
     */

    const { user, account } = await verifyAccess(username, companyCode)

    /**
     * Generate access token.
     *
     * Token expires in 30 days.
     * Token is stored in an HTTP-only cookie.
     */

    setAccessTokenCookie(c, user, account)

    return c.json({ success: true })
}
