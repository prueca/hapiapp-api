import Context from '@/lib/context'
import accountDelete from '@/lib/domains/account/accountDelete'

export default async (ctx: Context) => {
    const { id } = ctx.params

    try {
        const account = await accountDelete(id)
        if (!account) {
            ctx.send({ error: 'Account not found' }, 404)
            return
        }
        ctx.send({ data: account }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}