import { Context } from 'hono'
import Boom from '@hapi/boom'
import z from 'zod'
import _ from 'lodash'

import userRoles from '@/lib/user.roles'
import accountTypes from '@/lib/account.types'
import input from '@/lib/input'

import db, { t } from '@/lib/db'
import { eq, or, and, isNull, getColumns } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const schema = z.object({
    id: z.ulid(),
    type: z.enum([
        accountTypes.DEALER,
        accountTypes.HAPISTORE,
        accountTypes.DIRECT_STORE,
    ]),
    name: z.string().nonempty(),
    address: z.string().nonempty(),
    phone: z.string().nonempty(),
    isrCode: z.string().nullable(),
    sapCode: z.string().nullable(),
})

const verifyAccess = async (authAccount: Json, subjectId: string) => {
    const parent = alias(t.account, 'parent')

    const [account] = await db
        .select({ ...getColumns(t.account) })
        .from(t.account)
        .leftJoin(parent, eq(t.account.parentId, parent.id))
        .where(
            and(
                eq(t.account.id, subjectId),
                isNull(t.account.deletedAt),
                or(
                    eq(t.account.parentId, authAccount.id),
                    eq(parent.parentId, authAccount.id),
                ),
            ),
        )
        .limit(1)

    if (!account) {
        throw Boom.unauthorized('Account is not within scope.')
    }
}

export default async (c: Context) => {
    const authAccount = c.get('account')
    const authUser = c.get('user')

    switch (authUser.role) {
        case userRoles.DISTRIBUTOR_ADMIN:
            break
        default:
            throw Boom.unauthorized('User is not allowed to update account.')
    }

    const { id: subjectId, ...updates } = await input(c, schema)

    try {
        await verifyAccess(authAccount, subjectId)

        const [account] = await db
            .update(t.account)
            .set({ ...updates, updatedAt: new Date() })
            .where(
                and(eq(t.account.id, subjectId), isNull(t.account.deletedAt)),
            )
            .returning()

        if (!account) {
            throw Boom.notFound('Account was not found.')
        }

        return c.json({ account })
    } catch (error: any) {
        if (Boom.isBoom(error)) throw error

        const code = _.get(error, 'cause.code', null)

        switch (code) {
            case '23505':
                throw Boom.conflict('The data already exists.')

            case '23503':
                throw Boom.conflict(
                    'Related record does not exist or is still in use.',
                )

            case '23502':
                throw Boom.badRequest('A required field is missing.')

            case '23514':
                throw Boom.badData('The data does not satisfy a constraint.')

            case '22P02':
                throw Boom.badRequest(
                    'One or more values have an invalid format.',
                )
        }

        throw Boom.internal('An unexpected error occurred.')
    }
}
