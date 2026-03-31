import Context from '@/lib/context'
import userRoleUpdate from '@/lib/domains/userRole/userRoleUpdate'
import { z } from 'zod'

const userRoleSchema = z.object({
    role: z.string().nonempty().optional(),
})

export default async (ctx: Context) => {
    const { id, role } = ctx.params

    try {
        const parsed = await userRoleSchema.safeParseAsync({
            role,
        })

        if (!parsed.success) {
            ctx.send({ error: parsed.error.message }, 400)
            return
        }

        const userRoleData = parsed.data as z.infer<typeof userRoleSchema>
        const userRole = await userRoleUpdate(id, userRoleData)
        if (!userRole) {
            ctx.send({ error: 'User role not found' }, 404)
            return
        }
        ctx.send({ data: userRole }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}