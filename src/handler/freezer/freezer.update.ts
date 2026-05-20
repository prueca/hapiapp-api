import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    accountId: z.ulid().nullable().optional(),
    freezerTypeId: z.ulid().optional(),
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
    const record = await db.Freezer.findByPk(id)

    if (!record) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: ReasonPhrases.NOT_FOUND,
        })
    }

    const changes = _.pick(parsed.data, ['accountId', 'freezerTypeId'])

    if (_.isEmpty(changes)) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: 'No changes provided',
        })
    }

    if (changes.accountId) {
        const account = await db.Account.findByPk(changes.accountId)

        if (!account) {
            throw new HTTPException(StatusCodes.NOT_FOUND, {
                message: 'Account not found',
            })
        }
    }

    if (changes.freezerTypeId) {
        const freezerType = await db.FreezerType.findByPk(changes.freezerTypeId)

        if (!freezerType) {
            throw new HTTPException(StatusCodes.NOT_FOUND, {
                message: 'Freezer type not found',
            })
        }
    }

    try {
        return c.json({
            data: await record.update(changes),
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
