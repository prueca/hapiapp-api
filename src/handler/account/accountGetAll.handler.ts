import Context from '@/lib/context'
import accountGetAll from '@/lib/domains/account/accountGetAll'

export default async (ctx: Context) => {
    const { limit, after, sortBy, sortOrder, name, address, isrCode, sapCode, companyCode, accountTypeId, userId } = ctx.params

    const accounts = await accountGetAll(
        Number(limit) || 10,
        (after as string) || null,
        (sortBy as string) || 'createdAt',
        (sortOrder as 'ASC' | 'DESC') || 'DESC',
        (name as string) || null,
        (address as string) || null,
        (isrCode as string) || null,
        (sapCode as string) || null,
        (companyCode as string) || null,
        (accountTypeId as string) || null,
        (userId as string) || null,
    )

    ctx.send({ data: accounts }, 200)
}