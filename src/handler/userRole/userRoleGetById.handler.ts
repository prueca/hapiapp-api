import Context from '@/lib/context'
import userRoleGetById from '@/lib/domains/userRole/userRoleGetById'

export default async (ctx: Context) => {
    const { id } = ctx.params

    try {
        const userRole = await userRoleGetById(id as string)

        if (!userRole) {
            ctx.send({ error: 'User role not found' }, 404)
            return
        }

        ctx.send({ data: userRole }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}