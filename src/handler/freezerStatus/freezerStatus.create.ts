import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'

const schema = z.object({
    freezerId: z.ulid(),
    freezerStatusTypeId: z.ulid(),
    description: z.string().optional(),
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

    const { freezerId, freezerStatusTypeId } = parsed.data
    const [freezer, freezerStatusType] = await Promise.all([
        db.Freezer.findByPk(freezerId),
        db.FreezerStatusType.findByPk(freezerStatusTypeId),
    ])

    if (!freezer) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: 'Freezer not found',
        })
    }

    if (!freezerStatusType) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: 'Freezer status type not found',
        })
    }

    try {
        const record = await db.FreezerStatus.create({
            ...parsed.data,
            accountId: freezer.get('accountId') ?? null,
        })

        return c.json({ data: record })
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
