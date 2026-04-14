import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    id: z.array(z.ulid()).min(1).max(100),
    freezerTypeId: z.ulid().optional(),
    accountId: z.ulid().optional(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('INVALID_PAYLOAD', null, parsed.error.issues)
    }

    const changes = _.pick(parsed.data, ['accountId', 'freezerTypeId'])

    if (_.isEmpty(changes)) {
        throw new Exception('INVALID_PAYLOAD', 'No changes provided')
    }

    try {
        const [affectedRows] = await ctx.db.Freezer.update(changes, {
            where: {
                id: parsed.data.id,
            },
        })

        return {
            data: { affectedRows },
        }
    } catch (error: any) {
        switch (error.name) {
            case 'SequelizeValidationError':
                throw new Exception('SEQUELIZE_VALIDATION_ERROR', error.message)
            default:
                throw error
        }
    }
}
