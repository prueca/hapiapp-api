import Context from '@/lib/context'
import userGetAll from '@/lib/domains/user/userGetAll'

export default async (ctx: Context) => {
    const { limit, after, sortBy, sortOrder, username, firstName, lastName } = ctx.params

    const users = await userGetAll(
        Number(limit) || 10,
        (after as string) || null,
        (sortBy as string) || 'createdAt',
        (sortOrder as 'ASC' | 'DESC') || 'DESC',
        (username as string) || null,
        (firstName as string) || null,
        (lastName as string) || null,
    )

    ctx.send({ data: users }, 200)
}
