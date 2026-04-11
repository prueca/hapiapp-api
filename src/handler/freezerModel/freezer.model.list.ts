import Context from '@/lib/context'
import z from 'zod'

const schema = z.object({
    type: z.string().optional(),
    brand: z.string().optional(),
    year: z.string().optional(),
})

export default async (ctx: Context) => {}
