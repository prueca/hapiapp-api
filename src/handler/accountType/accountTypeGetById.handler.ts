import Context from '@/lib/context'
import accountTypeGetById from '@/lib/domains/accountType/accountTypeGetById'

export default async (ctx: Context) => {
    const { id } = ctx.params

    try {
        const accountType = await accountTypeGetById(id as string)

        if (!accountType) {
            ctx.send({ error: 'Account type not found' }, 404)
            return
        }

        ctx.send({ data: accountType }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}