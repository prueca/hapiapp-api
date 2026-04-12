import Context from '@/lib/context'
import * as z from 'zod'
import Exception from '@/lib/exception'

const schema = z.object({
    id: z.ulid(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', null, parsed.error.issues)
    }

    const data = await ctx.db.FreezerStatusName.findByPk(parsed.data.id)

    if (!data) {
        throw new Exception('NOT_FOUND')
    }

    return { data }
}
