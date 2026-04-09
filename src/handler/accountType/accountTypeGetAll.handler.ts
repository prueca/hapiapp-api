import Context from '@/lib/context'
import accountTypeGetAll from '@/lib/domains/accountType/accountTypeGetAll'

export default async (ctx: Context) => {
    const { limit, after, sortBy, sortOrder, account } = ctx.params

    const accountTypes = await accountTypeGetAll(
        Number(limit) || 10,
        (after as string) || null,
        (sortBy as string) || 'createdAt',
        (sortOrder as 'ASC' | 'DESC') || 'DESC',
        (account as string) || null,
    )

    ctx.send({ data: accountTypes }, 200)
}
