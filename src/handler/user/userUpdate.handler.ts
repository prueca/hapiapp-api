import Context from '@/lib/context'
import userUpdate from '@/lib/domains/user/userUpdate'
import { z } from 'zod'

const userSchema = z.object({
    firstName: z.string().nonempty().optional(),
    middleName: z.string().optional(),
    lastName: z.string().nonempty().optional(),
    username: z.string().nonempty().optional(),
    password: z.string().min(6).optional(),
    role: z.uuidv4().optional(),
})

export default async (ctx: Context) => {
    const { id, firstName, middleName, lastName, username, password, role } =
        ctx.params

    try {
        const parsed = await userSchema.safeParseAsync({
            firstName,
            middleName,
            lastName,
            username,
            password,
            role,
        })

        if (!parsed.success) {
            ctx.send({ error: parsed.error.message }, 400)
            return
        }

        const userData = parsed.data as z.infer<typeof userSchema>
        const user = await userUpdate(id, userData)
        if (!user) {
            ctx.send({ error: 'User not found' }, 404)
            return
        }
        ctx.send({ data: user }, 200)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}
