import Context from '@/lib/context'
import userRoleGetAll from '@/lib/domains/userRole/userRoleGetAll'

export default async (ctx: Context) => {
    const { limit, after, sortBy, sortOrder } = ctx.params

    const userRoles = await userRoleGetAll(
        Number(limit) || 10,
        (after as string) || null,
        (sortBy as string) || 'createdAt',
        (sortOrder as 'ASC' | 'DESC') || 'DESC',
    )

    ctx.send({ data: userRoles }, 200)
}