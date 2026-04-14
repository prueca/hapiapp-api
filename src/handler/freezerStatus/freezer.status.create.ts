import Context from '@/lib/context'
import z from 'zod'
import Exception from '@/lib/exception'

const schema = z.object({
    freezerId: z.ulid(),
    freezerStatusTypeId: z.ulid(),
    remarks: z.string().nonempty().optional(),
    // Todo: Accept accountId
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('INVALID_PAYLOAD', null, parsed.error.issues)
    }

    const [freezer, freezerStatusType] = await Promise.all([
        ctx.db.Freezer.findByPk(parsed.data.freezerId),
        ctx.db.FreezerStatusType.findByPk(parsed.data.freezerStatusTypeId),
        // Todo: Check if account exists using accountId
    ])

    if (!freezer || !freezerStatusType) {
        throw new Exception('NOT_FOUND')
    }

    return {
        data: await ctx.db.FreezerStatus.create({
            freezerId: freezer.get('id'),
            freezerStatusTypeId: freezerStatusType.get('id'),
            remarks: parsed.data.remarks,
        }),
    }
}
