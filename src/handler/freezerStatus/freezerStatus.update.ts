import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'
import _ from 'lodash'

const schema = z.object({
    description: z.string().optional(),
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

    if (_.isEmpty(parsed.data)) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
            message: 'No changes provided',
        })
    }

    const id = c.req.param('id')!
    const record = await db.FreezerStatus.findByPk(id)

    if (!record) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: ReasonPhrases.NOT_FOUND,
        })
    }

    return c.json({
        data: await record.update(parsed.data),
    })
}
