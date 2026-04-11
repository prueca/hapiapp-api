import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    id: z.uuidv4(),
    brand: z.string().nonempty().optional(),
    type: z.string().nonempty().optional(),
    year: z.string().nonempty().optional(),
    capacity: z.number().gt(0).optional(),
    capacity_unit: z.string().nonempty().optional(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', parsed.error.message)
    }

    const subjectId = parsed.data.id
    const params = _.pick(parsed.data, ['brand', 'type', 'year', 'capacity'])
    const subjectRecord = await ctx.db.FreezerModel.findByPk(subjectId)

    if (!subjectRecord) {
        throw new Exception('NOT_FOUND')
    }

    const data = await subjectRecord.update(params)

    return { data: data.toJSON() }
}
