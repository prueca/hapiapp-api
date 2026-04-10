import Context from '@/lib/context'
import accountUpdate from '@/lib/domains/account/accountUpdate'
import { z } from 'zod'

const accountSchema = z.object({
    name: z.string().nonempty().optional(),
    address: z.string().nonempty().optional(),
    isrCode: z.string().optional(),
    sapCode: z.string().optional(),
    companyCode: z.string().nonempty().optional(),
    accountTypeId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
})

export default async (ctx: Context) => {
    const { id, name, address, isrCode, sapCode, companyCode, accountTypeId, userId } = ctx.params

    try {
        const parsed = await accountSchema.safeParseAsync({
            name,
            address,
            isrCode,
            sapCode,
            companyCode,
            accountTypeId,
            userId,
        })

        if (!parsed.success) {
            ctx.send({ error: parsed.error.message }, 400)
            return
        }

        const accountData = parsed.data as z.infer<typeof accountSchema>
        const account = await accountUpdate(id, accountData)
        if (!account) {
            ctx.send({ error: 'Account not found' }, 404)
            return
        }
        ctx.send({ data: account }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}