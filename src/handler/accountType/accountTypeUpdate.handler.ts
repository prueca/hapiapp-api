import Context from '@/lib/context'
import accountTypeUpdate from '@/lib/domains/accountType/accountTypeUpdate'
import { z } from 'zod'

const accountTypeSchema = z.object({
    account: z.string().nonempty().optional(),
})

export default async (ctx: Context) => {
    const { id, account } = ctx.params

    try {
        const parsed = await accountTypeSchema.safeParseAsync({
            account,
        })

        if (!parsed.success) {
            ctx.send({ error: parsed.error.message }, 400)
            return
        }

        const accountTypeData = parsed.data as z.infer<typeof accountTypeSchema>
        const accountType = await accountTypeUpdate(id, accountTypeData)
        if (!accountType) {
            ctx.send({ error: 'Account type not found' }, 404)
            return
        }
        ctx.send({ data: accountType }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}