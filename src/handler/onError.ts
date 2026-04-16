import type { Context } from 'hono'
import type { HTTPResponseError } from 'hono/types'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes } from 'http-status-codes'

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
        StatusCodes.INTERNAL_SERVER_ERROR,
    )
}
