import { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import Boom from '@hapi/boom'
import jwt, { type SignOptions } from 'jsonwebtoken'
import * as argon2 from 'argon2'
import z from 'zod'
import _ from 'lodash'

import env from '@/lib/env'
import input from '@/lib/input'

import db, { t } from '@/lib/db'
import { eq, and, isNull } from 'drizzle-orm'

const schema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
})

export default async (c: Context) => {
    const { username, password } = await input(c, schema)

    /**
     * Check if user exists by username.
     */

    const [user] = await db
        .select({
            id: t.user.id,
            username: t.user.username,
            password: t.user.password,
        })
        .from(t.user)
        .where(eq(t.user.username, username))
        .limit(1)

    if (!user) {
        throw Boom.unauthorized('Invalid username or password.')
    }

    /**
     * Validate password.
     */

    const isValidPassword = await argon2.verify(user.password, password)

    if (!isValidPassword) {
        throw Boom.unauthorized('Invalid username or password.')
    }

    /**
     * Generate authorization token.
     *
     * Token is stored in an HTTP-only cookie.
     * Token expires in 5 minutes.
     */

    const authToken = jwt.sign(
        {
            username: user.username,
        },
        env.AUTHORIZATION_TOKEN_SECRET as string,
        {
            expiresIn:
                env.AUTHORIZATION_TOKEN_VALIDITY as SignOptions['expiresIn'],
        },
    )

    setCookie(c, env.AUTHORIZATION_TOKEN_COOKIE as string, authToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    })

    /**
     * Return all accounts accessible to the user.
     */

    const accounts = await db
        .select({
            id: t.account.id,
            type: t.account.type,
            name: t.account.name,
            address: t.account.address,
        })
        .from(t.access)
        .innerJoin(t.account, eq(t.access.accountId, t.account.id))
        .where(and(eq(t.access.userId, user.id), isNull(t.account.deletedAt)))

    return c.json({ accounts })
}
