import Context from '@/lib/context'
import userDelete from '@/lib/domains/user/userDelete'

export default async (ctx: Context) => {
    const { id } = ctx.params

    try {
        const user = await userDelete(id)
        if (!user) {
            ctx.send({ error: 'User not found' }, 404)
            return
        }
        ctx.send({ data: user }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}
