import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'

export default async (ctx: Context) => {
    const schema = z.object({
        id: z.uuidv4(),
    })

    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', parsed.error.message)
    }

    const subjectId = parsed.data.id
    const subjectRecord = await ctx.db.FreezerModel.findByPk(subjectId)

    if (!subjectRecord) {
        throw new Exception('NOT_FOUND')
    }

    await subjectRecord.destroy()

    return { success: true }
}
