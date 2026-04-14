import Context from '@/lib/context'
import accountCreate from '@/lib/domains/account/accountCreate'
import { z } from 'zod'

const accountSchema = z.object({
    name: z.string().nonempty(),
    address: z.string().nonempty(),
    isrCode: z.string().optional(),
    sapCode: z.string().optional(),
    companyCode: z.string().nonempty(),
    accountTypeId: z.string().uuid(),
    userId: z.string().uuid(),
})

export default async (ctx: Context) => {
    const { name, address, isrCode, sapCode, companyCode, accountTypeId, userId } = ctx.params

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
        const account = await accountCreate(accountData)
        ctx.send({ data: account }, 201)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}