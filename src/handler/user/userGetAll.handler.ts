import Context from '@/lib/context'
import userGetAll from '@/lib/domains/user/userGetAll'

export default async (ctx: Context) => {
    const { limit, after, sortBy, sortOrder } = ctx.params

    const users = await userGetAll(
        Number(limit) || 10,
        (after as string) || null,
        (sortBy as string) || 'createdAt',
        (sortOrder as 'ASC' | 'DESC') || 'ASC',
    )

    ctx.send({ data: users }, 200)
}
