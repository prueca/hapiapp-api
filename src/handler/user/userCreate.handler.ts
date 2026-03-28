import Context from '@/lib/context'
import userCreate from '@/lib/domains/user/userCreate'
import { z } from 'zod'

const userSchema = z.object({
    firstName: z.string().nonempty(),
    middleName: z.string().optional(),
    lastName: z.string().nonempty(),
    username: z.string().nonempty(),
    password: z.string().min(6),
    role: z.uuidv4(),
})

export default async (ctx: Context) => {
    const { firstName, middleName, lastName, username, password, role } =
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
        const user = await userCreate(userData)
        ctx.send({ data: user }, 201)
    } catch (e: any) {
        ctx.send({ error: e.message || 'Internal server error' }, 500)
    }
}
