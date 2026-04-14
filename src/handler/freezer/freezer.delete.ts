import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    id: z.ulid(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('INVALID_PAYLOAD', null, parsed.error.issues)
    }

    const subjectRecord = await ctx.db.Freezer.findByPk(parsed.data.id)

    if (!subjectRecord) {
        throw new Exception('NOT_FOUND')
    }

    try {
        await subjectRecord.destroy()

        return {
            data: subjectRecord,
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
