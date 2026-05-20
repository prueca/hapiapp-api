import type { Context } from 'hono'
import { Op } from 'sequelize'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    filters: z
        .object({
            name: z.string().optional(),
            address: z.string().optional(),
            phone: z.string().optional(),
            isrCode: z.string().optional(),
            sapCode: z.string().optional(),
            companyCode: z.string().optional(),
            accountTypeId: z.ulid().optional(),
            associateId: z.ulid().optional(),
        })
        .optional(),
    limit: z.coerce.number().positive().optional(),
    sortBy: z
        .enum([
            'id',
            'createdAt',
            'updatedAt',
            'name',
            'address',
            'phone',
            'isrCode',
            'sapCode',
            'companyCode',
            'accountTypeId',
            'associateId',
        ])
        .optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    nextCursor: z.ulid().nullable().optional(),
})

export default async (c: Context) => {
    const params = c.req.query()
    const filters = { ...params }

    const parsed = schema.safeParse({
        filters,
        limit: params.limit ? parseInt(params.limit, 10) : undefined,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        nextCursor: params.nextCursor,
    })

    if (!parsed.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: ReasonPhrases.BAD_REQUEST,
            cause: parsed.error.issues,
        })
    }

    const {
        filters: parsedFilters,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        nextCursor,
    } = parsed.data

    const where: Record<string, any> = _.mapValues(parsedFilters, (value) => {
        return value ? { [Op.like]: `%${value}%` } : undefined
    })

    // Remove undefined filter values
    Object.keys(where).forEach((key) => {
        if (where[key] === undefined) {
            delete where[key]
        }
    })

    if (nextCursor) {
        const comparison = sortOrder === 'asc' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: nextCursor }
    }

    const data = await db.Account.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return c.json({ data })
}
