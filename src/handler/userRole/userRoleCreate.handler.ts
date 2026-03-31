import Context from '@/lib/context'
import userRoleCreate from '@/lib/domains/userRole/userRoleCreate'
import { z } from 'zod'

const userRoleSchema = z.object({
    role: z.string().nonempty(),
})

export default async (ctx: Context) => {
    const { role } = ctx.params

    try {
        const parsed = await userRoleSchema.safeParseAsync({
            role,
        })

        if (!parsed.success) {
            ctx.send({ error: parsed.error.message }, 400)
            return
        }

        const userRoleData = parsed.data as z.infer<typeof userRoleSchema>
        const userRole = await userRoleCreate(userRoleData)
        ctx.send({ data: userRole }, 201)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}