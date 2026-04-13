import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'

const schema = z.object({
    id: z.ulid(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('INVALID_PAYLOAD', null, parsed.error.issues)
    }

    const subjectRecord = await ctx.db.FreezerType.findByPk(parsed.data.id)

    if (!subjectRecord) {
        throw new Exception('NOT_FOUND')
    }

    await subjectRecord.destroy()

    return { success: true }
}
