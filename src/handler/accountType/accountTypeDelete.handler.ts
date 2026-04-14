import Context from '@/lib/context'
import accountTypeDelete from '@/lib/domains/accountType/accountTypeDelete'

export default async (ctx: Context) => {
    const { id } = ctx.params

    try {
        const accountType = await accountTypeDelete(id)
        if (!accountType) {
            ctx.send({ error: 'Account type not found' }, 404)
            return
        }
        ctx.send({ data: accountType }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}