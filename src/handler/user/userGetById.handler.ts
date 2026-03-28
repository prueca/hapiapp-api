import Context from '@/lib/context'
import userGetById from '@/lib/domains/user/userGetById'

export default async (ctx: Context) => {
    const { id } = ctx.params

    try {
        const user = await userGetById(id as string)

        if (!user) {
            ctx.send({ error: 'User not found' }, 404)
            return
        }

        ctx.send({ data: user }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}
