import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import db from '@/lib/db'
import z from 'zod'

const schema = z.object({
    firstName: z.string().nonempty(),
    middleName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    username: z.string().nonempty(),
    password: z.string().nonempty(),
    roleId: z.ulid().nonempty(),
    accountId: z.ulid().nonempty(),
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

    const { accountId, roleId } = parsed.data
    const [account, role] = await Promise.all([
        db.Account.findByPk(accountId),
        db.UserRole.findByPk(roleId),
    ])

    if (!account) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: 'Account not found',
        })
    }

    if (!role) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {
            message: 'Role not found',
        })
    }

    try {
        return c.json({
            data: await db.User.create(parsed.data),
        })
    } catch (err: any) {
        switch (err.name) {
            case 'SequelizeUniqueConstraintError':
                throw new HTTPException(StatusCodes.CONFLICT, {
                    message: ReasonPhrases.CONFLICT,
                    cause: err.name,
                })
            case 'SequelizeValidationError':
                throw new HTTPException(StatusCodes.UNPROCESSABLE_ENTITY, {
                    message: ReasonPhrases.UNPROCESSABLE_ENTITY,
                    cause: err.name,
                })
            default:
                throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: err.message,
                    cause: err.stack,
                })
        }
    }
}
