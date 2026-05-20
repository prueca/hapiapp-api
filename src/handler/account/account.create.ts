import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'

const schema = z.object({
    name: z.string().nonempty(),
    address: z.string().nonempty(),
    phone: z.string().nonempty(),
    isrCode: z.string().nonempty(),
    sapCode: z.string().nonempty(),
    companyCode: z.string().nonempty(),
    accountTypeId: z.string().nonempty(),
    associateId: z.string().optional(),
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

    const { accountTypeId } = parsed.data
    const accountType = await db.AccountType.findByPk(accountTypeId)

    if (!accountType) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: 'Account type not found',
        })
    }

    // TODO: if associateId is provided, check if it exists

    try {
        return c.json({
            data: await db.Account.create(parsed.data),
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
