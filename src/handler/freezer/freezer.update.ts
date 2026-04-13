import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    id: z.ulid(),
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

    const subjectRecord = await ctx.db.Freezer.findByPk(parsed.data.id)

    if (!subjectRecord) {
        throw new Exception('NOT_FOUND')
    }

    try {
        return {
            data: await subjectRecord.update(changes),
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
