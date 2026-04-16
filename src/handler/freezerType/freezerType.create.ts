import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'

const schema = z.object({
    brand: z.string().nonempty(),
    type: z.string().nonempty(),
    year: z.number().positive(),
    capacity: z.string().nonempty(),
})

export default async (c: Context) => {
    const body = await c.req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: parsed.error.message,
            cause: parsed.error.issues,
        })
    }

    try {
        return c.json({
            data: await db.FreezerType.create(parsed.data),
        })
    } catch (err: any) {
        switch (err.name) {
            case 'SequelizeUniqueConstraintError':
                throw new HTTPException(StatusCodes.CONFLICT, {
                    message: ReasonPhrases.CONFLICT,
                    cause: err.name,
                })
            case 'SequelizeValidationError':
                throw new HTTPException(StatusCodes.UNPROCESSABLE_ENTITY, {
                    message: ReasonPhrases.UNPROCESSABLE_ENTITY,
                    cause: err.name,
                })
            default:
                throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: err.message,
                    cause: err.stack,
                })
        }
    }
}
