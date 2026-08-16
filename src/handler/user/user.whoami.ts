import type { Context } from 'hono'
import { getCookie } from 'hono/cookie'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

import User from '@/lib/db/User'
import Account from '@/lib/db/Account'

export default async (c: Context) => {
    const accessToken = getCookie(c, 'access-token')

    if (!accessToken) {
        return c.json(
            {
                message: ReasonPhrases.UNAUTHORIZED,
            },
            StatusCodes.UNAUTHORIZED,
        )
    }

    try {
        type TokenPayload = {
            user: User
            account: Account
        }

        let payload = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET as string,
        ) as TokenPayload

        payload = _.pick(payload, ['user', 'account'])

        return c.json({ data: payload })
    } catch {
        return c.json(
            {
                message: ReasonPhrases.UNAUTHORIZED,
            },
            StatusCodes.UNAUTHORIZED,
        )
    }
}
