import { Context } from 'hono'
import Boom from '@hapi/boom'
import z from 'zod'

export default async <T extends z.ZodObject>(c: Context, schema: T) => {
    const json = await c.req.json()
    const parsed = schema.safeParse(json)

    if (!parsed.success) {
        throw Boom.badRequest('Invalid request payload.')
    }

    return parsed.data
}
