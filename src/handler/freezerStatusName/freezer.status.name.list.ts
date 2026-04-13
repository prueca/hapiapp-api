import Context from '@/lib/context'
import Exception from '@/lib/exception'
import { PlainObject } from '@/lib/types'
import { Op } from 'sequelize'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    filters: z.object({
        name: z.string().optional(),
    }),
    limit: z.number().positive(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    nextCursor: z.ulid().nullable().optional(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('INVALID_PAYLOAD', null, parsed.error.issues)
    }

    const {
        filters,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        nextCursor,
    } = parsed.data

    const where: PlainObject = _.mapValues(filters, (value) => {
        return { [Op.like]: `%${value}%` }
    })

    if (nextCursor) {
        const comparison = sortOrder === 'asc' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: nextCursor }
    }

    const data = await ctx.db.FreezerStatusName.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return { data }
}
