import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { setCookie } from 'hono/cookie'
import z from 'zod'
import * as argon2 from 'argon2'
import jwt, { type SignOptions } from 'jsonwebtoken'
import _ from 'lodash'

import env from '@/lib/env'
import errors from '@/lib/errors'

import db from '@/lib/db'
import * as t from '@/lib/db/schema'
import { eq, and, isNull } from 'drizzle-orm'

const schema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
})

const invalidLogin = new HTTPException(401, {
    message: 'Invalid username or password.',
})

export default async (c: Context) => {
    const payload = await c.req.json()
    const parsed = schema.safeParse(payload)

    if (!parsed.success) {
        throw new HTTPException(400, {
            message: errors.INVALID_PAYLOAD.message,
            cause: parsed.error.issues,
        })
    }

    const { username, password } = parsed.data

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
        throw invalidLogin
    }

    /**
     * Validate password.
     */

    const isValidPassword = await argon2.verify(user.password, password)

    if (!isValidPassword) {
        throw invalidLogin
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
