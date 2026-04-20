import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'

const schema = z.object({
    id: z.array(z.ulid()).min(1).max(100),
})

export default async (c: Context) => {
    const body = await c.req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: ReasonPhrases.BAD_REQUEST,
            cause: parsed.error.issues,
        })
    }

    const affectedRows = await db.Freezer.destroy({
        where: {
            id: parsed.data.id,
        },
    })

    return c.json({
        data: { affectedRows },
    })
}
