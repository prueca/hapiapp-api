import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Op } from 'sequelize'
import db from '@/lib/db'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    filters: z
        .object({
            accountId: z.ulid().nullable().optional(),
            freezerTypeId: z.ulid().optional(),
        })
        .optional(),
    limit: z.number().positive(),
    sortBy: z.enum(['id', 'createdAt', 'updatedAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    nextCursor: z.ulid().nullable().optional(),
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

    const {
        filters,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        nextCursor,
    } = parsed.data

    const where: Record<string, any> = filters ?? {}

    if (nextCursor) {
        const comparison = sortOrder === 'asc' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: nextCursor }
    }

    const data = await db.Freezer.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return c.json({ data })
}
