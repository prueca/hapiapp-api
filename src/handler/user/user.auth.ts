import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { setCookie } from 'hono/cookie'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as argon2 from 'argon2'
import moment from 'moment'
import db from '@/lib/db'
import token from '@/lib/util/token'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    username: z.string().nonempty(),
    companyCode: z.string().nonempty(),
    password: z.string().nonempty(),
})

export default async (c: Context) => {
    const body = await c.req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: ReasonPhrases.BAD_REQUEST,
            cause: parsed.error.issues,
        })
    }

    const { username, companyCode, password } = parsed.data

    const invalidLogin = new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: 'Invalid username, password or company code',
    })

    let [user, account] = await Promise.all([
        db.User.findOne({
            where: { username },
        }),
        db.Account.findOne({
            where: { companyCode },
        }),
    ])

    /**
     * Check if the user and account exist
     * and if the user is associated with the account
     */

    const isValidUser = user && account && user.accountId === account.id

    if (!isValidUser) {
        throw invalidLogin
    }

    /**
     * Check if the password is valid
     */

    const isValidPassword = await argon2.verify(user.password, password)

    if (!isValidPassword) {
        throw invalidLogin
    }

    /**
     * Generate access token
     *
     * Token expires after 30 days
     */

    const userRole = await db.UserRole.findByPk(user.roleId)

    if (!userRole) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'User role not found',
        })
    }

    const isProd = process.env.NODE_ENV === 'production'

    const jwtPayload = _.assign(
        _.pick(user, ['firstName', 'middleName', 'lastName']),
        _.pick(userRole, ['role']),
    )
    const accessToken = token.generate(jwtPayload)
    const accessTokenExpiry = moment().add(
        Number(process.env.ACCESS_TOKEN_VALIDITY),
        'day',
    )

    const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
        expires: accessTokenExpiry.toDate(),
    }

    setCookie(c, 'access-token', accessToken, cookieOptions)

    return c.json({ data: jwtPayload })
}
