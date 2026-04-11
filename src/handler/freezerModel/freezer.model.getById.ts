import Context from '@/lib/context'
import * as z from 'zod'
import Exception from '@/lib/exception'

export default async (ctx: Context) => {
    const schema = z.object({
        id: z.uuidv4(),
    })

    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', parsed.error.message)
    }

    const data = await ctx.db.FreezerModel.findByPk(parsed.data.id)

    if (!data) {
        throw new Exception('NOT_FOUND')
    }

    return data.toJSON()
}
