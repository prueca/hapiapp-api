import Context from '@/lib/context'
import * as z from 'zod'
import Exception from '@/lib/exception'

export default async (ctx: Context) => {
    const schema = z.object({
        brand: z.string().nonempty(),
        type: z.string().nonempty(),
        year: z.string().nonempty(),
        capacity: z.string().nonempty(),
    })

    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', parsed.error.message)
    }

    try {
        const data = await ctx.db.FreezerModel.create(parsed.data)

        return data.toJSON()
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            // This means that the brand, type and year
            // combination already exists.
            throw new Exception('CONFLICT')
        }

        throw error
    }
}
