import type { Context } from 'hono'
import { getCookie } from 'hono/cookie'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import token from '@/lib/util/token'
import _ from 'lodash'

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
        let user = token.verify(accessToken)
        user = _.pick(user, ['firstName', 'middleName', 'lastName', 'role'])

        return c.json(user)
    } catch {
        return c.json(
            {
                message: ReasonPhrases.UNAUTHORIZED,
            },
            StatusCodes.UNAUTHORIZED,
        )
    }
}
