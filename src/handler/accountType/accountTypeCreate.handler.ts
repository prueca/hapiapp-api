import Context from '@/lib/context'
import accountTypeCreate from '@/lib/domains/accountType/accountTypeCreate'
import { z } from 'zod'

const accountTypeSchema = z.object({
    account: z.string().nonempty(),
})

export default async (ctx: Context) => {
    const { account } = ctx.params

    try {
        const parsed = await accountTypeSchema.safeParseAsync({
            account,
        })

        if (!parsed.success) {
            ctx.send({ error: parsed.error.message }, 400)
            return
        }

        const accountTypeData = parsed.data as z.infer<typeof accountTypeSchema>
        const accountType = await accountTypeCreate(accountTypeData)
        ctx.send({ data: accountType }, 201)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}