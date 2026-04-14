import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    id: z.ulid(),
    name: z.string().nonempty().optional(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('INVALID_PAYLOAD', null, parsed.error.issues)
    }

    const subjectId = parsed.data.id
    const params = _.pick(parsed.data, ['name'])
    const subjectRecord = await ctx.db.FreezerStatusType.findByPk(subjectId)

    if (!subjectRecord) {
        throw new Exception('NOT_FOUND')
    }

    try {
        return {
            data: await subjectRecord.update(params),
        }
    } catch (error: any) {
        switch (error.name) {
            case 'SequelizeUniqueConstraintError':
                throw new Exception('CONFLICT')
            default:
                throw error
        }
    }
}
