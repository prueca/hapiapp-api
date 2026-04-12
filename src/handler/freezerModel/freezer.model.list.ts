import Context from '@/lib/context'
import Exception from '@/lib/exception'
import { PlainObject } from '@/lib/types'
import { Op } from 'sequelize'
import z from 'zod'

const schema = z.object({
    filters: z.object({
        brand: z.string().optional(),
        type: z.string().optional(),
        year: z.number().positive().optional(),
        capacity: z.number().positive().optional(),
        capacity_unit: z.string().nonempty().optional(),
    }),
    limit: z.number().positive(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    nextCursor: z.ulid().nullable().optional(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', null, parsed.error.issues)
    }

    const {
        filters,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        nextCursor,
    } = parsed.data

    const where: PlainObject = filters

    if (nextCursor) {
        const comparison = sortOrder === 'asc' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: nextCursor }
    }

    const data = await ctx.db.FreezerModel.findAll({
        limit,
        where: filters,
        order: [[sortBy, sortOrder]],
    })

    return { data }
}
