import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    name: z.string().nonempty().optional(),
    address: z.string().nonempty().optional(),
    phone: z.string().nonempty().optional(),
    isrCode: z.string().nonempty().optional(),
    sapCode: z.string().nonempty().optional(),
    companyCode: z.string().nonempty().optional(),
    accountTypeId: z.string().nonempty().optional(),
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

    const id = c.req.param('id')!
    const record = await db.Account.findByPk(id)

    if (!record) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: ReasonPhrases.NOT_FOUND,
        })
    }

    try {
        const changes = _.pick(parsed.data, [
            'name',
            'address',
            'phone',
            'isrCode',
            'sapCode',
            'companyCode',
            'accountTypeId',
            'associateId',
        ])

        return c.json({
            data: await record.update(changes),
        })
    } catch (err: any) {
        switch (err.name) {
            case 'SequelizeUniqueConstraintError':
                throw new HTTPException(StatusCodes.CONFLICT, {
                    message: ReasonPhrases.CONFLICT,
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