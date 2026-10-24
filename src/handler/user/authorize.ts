import { Context } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import Boom from '@hapi/boom'
import jwt, { type SignOptions } from 'jsonwebtoken'
import moment from 'moment'
import z from 'zod'
import _ from 'lodash'

import input from '@/lib/input'
import env from '@/lib/env'

import db from '@/lib/db'
import * as t from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

type TokenPayload = {
    username: string
}

const schema = z.object({
    accountId: z.string().nonempty(),
})

const verifyAuthToken = (c: Context) => {
    const authToken = getCookie(c, env.AUTHORIZATION_TOKEN_COOKIE)

    if (!authToken) {
        throw Boom.unauthorized('Missing authorization token.')
    }

    try {
        return jwt.verify(authToken, env.AUTHORIZATION_TOKEN_SECRET)
    } catch {
        throw Boom.unauthorized('Invalid authorization token.')
    }
}

const verifyAccess = async (username: string, accountId: string) => {
    const [row] = await db
        .select()
        .from(t.access)
        .innerJoin(t.user, eq(t.user.username, username))
        .innerJoin(t.account, eq(t.account.id, accountId))
        .limit(1)

    if (!row || !row.user || !row.account) {
        throw Boom.unauthorized('Invalid access.')
    }

    return {
        user: row.user,
        account: row.account,
    }
}

const authorize = (
    c: Context,
    user: typeof t.user.$inferSelect,
    account: typeof t.account.$inferSelect,
) => {
    const jwtPayload = {
        user: _.pick(user, [
            'id',
            'role',
            'username',
            'firstName',
            'middleName',
            'lastName',
        ]),
        account: _.pick(account, ['id', 'type', 'name', 'type', 'address']),
    }

    const accessToken = jwt.sign(
        jwtPayload,
        env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: env.ACCESS_TOKEN_VALIDITY as SignOptions['expiresIn'],
        },
    )

    const match = (env.ACCESS_TOKEN_VALIDITY as string).match(
        /^(\d+)([A-Za-z])$/,
    )

    if (!match) {
        throw Boom.internal('Invalid format for ACCESS_TOKEN_VALIDITY.')
    }

    const [, amount, unit] = match as [
        string,
        moment.DurationInputArg1,
        moment.DurationInputArg2,
    ]

    const accessTokenExpiry = moment().add(Number(amount), unit)

    setCookie(c, env.ACCESS_TOKEN_COOKIE, accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: accessTokenExpiry.diff(moment(), 's'),
    })
}

export default async (c: Context) => {
    const { accountId } = await input(c, schema)

    /**
     * Verify authorization token.
     *
     * This returns a payload containing the username.
     */

    const { username } = verifyAuthToken(c) as TokenPayload

    /**
     * Verify access.
     *
     * This returns the user and account record.
     */

    const { user, account } = await verifyAccess(username, accountId)

    /**
     * Generate access token.
     *
     * Token expires in 30 days.
     * Token is stored in an HTTP-only cookie.
     */

    authorize(c, user, account)

    return c.json({ user, account })
}
