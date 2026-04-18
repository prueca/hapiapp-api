import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'

export default async (c: Context) => {
    const id = c.req.param('id')!
    const record = await db.UserRole.findByPk(id)

    if (!record) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: ReasonPhrases.NOT_FOUND,
        })
    }

    await record.destroy()

    return c.json({ data: record })
}