import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'

const schema = z.object({
    name: z.string().nonempty(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('INVALID_PAYLOAD', null, parsed.error.issues)
    }

    try {
        return {
            data: await ctx.db.FreezerStatusName.create(parsed.data),
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
