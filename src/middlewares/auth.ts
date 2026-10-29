import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'
import _ from 'lodash'

import env from '@/lib/env'

import * as t from '@/lib/db/schema'

type Decoded = {
    user: typeof t.user.$inferSelect
    account: typeof t.account.$inferSelect
}

export default async (c: Context, next: Next) => {
    const accessToken = getCookie(c, env.ACCESS_TOKEN_COOKIE)

    if (!accessToken) {
        throw Boom.unauthorized('Access token was not found.')
    }

    try {
        const decoded = jwt.verify(
            accessToken,
            env.ACCESS_TOKEN_SECRET,
        ) as Decoded

        c.set('user', decoded.user)
        c.set('account', decoded.account)

        await next()
    } catch {
        throw Boom.unauthorized('Invalid access token.')
    }
}
