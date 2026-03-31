import Context from '@/lib/context'
import userRoleDelete from '@/lib/domains/userRole/userRoleDelete'

export default async (ctx: Context) => {
    const { id } = ctx.params

    try {
        const userRole = await userRoleDelete(id)
        if (!userRole) {
            ctx.send({ error: 'User role not found' }, 404)
            return
        }
        ctx.send({ data: userRole }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}