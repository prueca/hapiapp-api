import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Op } from 'sequelize'
import db from '@/lib/db'
import z from 'zod'

const schema = z.object({
    limit: z.coerce.number().positive().optional(),
    sortBy: z.enum(['id', 'createdAt', 'updatedAt', 'cabconCodeId', 'accountId', 'freezerId']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
})

export default async (c: Context) => {
    const query = c.req.query()
    const parsed = schema.safeParse(query)

    if (!parsed.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: ReasonPhrases.BAD_REQUEST,
            cause: parsed.error.issues,
        })
    }

    const {
        limit,
        sortBy = 'createdAt',
        sortOrder = 'desc',
    } = parsed.data

    const where: Record<string, any> = {}

    const data = await db.Cabcon.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return c.json({ data })
}