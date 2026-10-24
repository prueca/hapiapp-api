import type { Context } from 'hono'
import type { HTTPResponseError } from 'hono/types'
import { HTTPException } from 'hono/http-exception'
import { ContentfulStatusCode } from 'hono/utils/http-status'
import Boom from '@hapi/boom'

export default (err: Error | HTTPResponseError, c: Context) => {
    if (err instanceof HTTPException) {
        return c.json(
            {
                message: err.message,
                cause: err.cause,
            },
            err.status,
        )
    }

    if (Boom.isBoom(err)) {
        const { statusCode, payload } = err.output

        return c.json(payload, statusCode as ContentfulStatusCode)
    }

    return c.json(
        {
            message: err.message,
            cause: err.stack,
        },
        500,
    )
}
