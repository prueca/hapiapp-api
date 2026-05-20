import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'

const schema = z.object({
    accountId: z.ulid().nullable(),
    freezerTypeId: z.ulid(),
})

export default async (c: Context) => {
    const body = await c.req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: ReasonPhrases.BAD_REQUEST,
            cause: parsed.error.issues,
        })
    }

    const { accountId, freezerTypeId } = parsed.data

    if (accountId) {
        const account = await db.Account.findByPk(accountId)

        if (!account) {
            throw new HTTPException(StatusCodes.NOT_FOUND, {
                message: 'Account not found',
            })
        }
    }

    const freezerType = await db.FreezerType.findByPk(freezerTypeId)

    if (!freezerType) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: 'Freezer type not found',
        })
    }

    try {
        return c.json({
            data: await db.Freezer.create(parsed.data),
        })
    } catch (err: any) {
        switch (err.name) {
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
