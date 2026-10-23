import type { Context } from 'hono'
import type { HTTPResponseError } from 'hono/types'
import { HTTPException } from 'hono/http-exception'

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

    return c.json(
        {
            message: err.message,
            cause: err.stack,
        },
        500,
    )
}
