import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { setCookie } from 'hono/cookie'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import z from 'zod'
import _ from 'lodash'

import User from '@/lib/db/User'
import Account from '@/lib/db/Account'
import Access from '@/lib/db/Access'

const schema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
})

const invalidLogin = new HTTPException(StatusCodes.UNAUTHORIZED, {
    message: 'Invalid username or password',
})

const setAuthTokenCookie = (c: Context, jwtPayload: PlainObject) => {
    const authToken = jwt.sign(
        jwtPayload,
        process.env.AUTH_TOKEN_SECRET as string,
        {
            expiresIn: process.env
                .AUTH_TOKEN_VALIDITY as SignOptions['expiresIn'],
        },
    )

    const isProd = process.env.NODE_ENV === 'production'

    const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
    }

    setCookie(c, 'auth-token', authToken, cookieOptions)
}

const getAccounts = async (user: User) => {
    let accessRecords = await Access.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Account,
                as: 'account',
                required: true,
            },
        ],
        raw: true,
        nest: true,
    })

    const accounts = _.map(accessRecords, (x) => {
        return _.pick(x.account, [
            'id',
            'type',
            'name',
            'address',
            'companyCode',
        ])
    })

    return accounts
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

    const { username, password } = parsed.data

    /**
     * Check username validity
     */

    const user = await User.findOne({
        where: { username },
    })

    if (!user) {
        throw invalidLogin
    }

    /**
     * Check password validity.
     */

    const isValidPassword = await argon2.verify(user.password, password)

    if (!isValidPassword) {
        throw invalidLogin
    }

    /**
     * Generate authentication token.
     *
     * Token is stored in an HTTP-only cookie.
     * Token expires in 5 minutes.
     */

    setAuthTokenCookie(c, { username: user.username })

    /**
     * Return all accounts accessible to the user.
     */

    const accounts = await getAccounts(user)
    const data = { accounts }

    return c.json({ data })
}
