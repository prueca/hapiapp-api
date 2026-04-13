import Context from '@/lib/context'
import * as z from 'zod'
import Exception from '@/lib/exception'

const schema = z.object({
    brand: z.string().nonempty(),
    type: z.string().nonempty(),
    year: z.number().positive(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', null, parsed.error.issues)
    }

    try {
        return {
            data: await ctx.db.FreezerType.create(parsed.data),
        }
    } catch (error: any) {
        switch (error.name) {
            case 'SequelizeUniqueConstraintError':
                throw new Exception('CONFLICT')
            case 'SequelizeValidationError':
                throw new Exception('SEQUELIZE_VALIDATION_ERROR', error.message)
            default:
                throw error
        }
    }
}
