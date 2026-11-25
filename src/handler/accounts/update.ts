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
    type: z
        .enum([
            accountTypes.DEALER,
            accountTypes.HAPISTORE,
            accountTypes.DIRECT_STORE,
        ])
        .optional(),
    name: z.string().nonempty().optional(),
    address: z.string().nonempty().optional(),
    phone: z.string().nonempty().optional(),
    isrCode: z.string().nullable().optional(),
    sapCode: z.string().nullable().optional(),
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
                or(
                    eq(t.account.parentId, authAccount.id),
                    eq(parent.parentId, authAccount.id),
                ),
                isNull(t.account.deletedAt),
            ),
        )
        .limit(1)

    if (!account) {
        throw Boom.unauthorized('Account was not found.')
    }
}

const verifyName = async (name?: string) => {
    if (!name) return

    name = name.trim()

    const [account] = await db
        .select()
        .from(t.account)
        .where(eq(t.account.name, name))
        .limit(1)

    if (account) {
        throw Boom.conflict('Account name is taken.')
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
        // Verify that the account exists within the scope
        // and is not deleted.
        await verifyAccess(authAccount, subjectId)

        // Check if the account name is taken.
        // If no name is supplied, then the checking is skipped.
        await verifyName(updates.name)

        const [account] = await db
            .update(t.account)
            .set({ ...updates, updatedAt: new Date() })
            .where(eq(t.account.id, subjectId))
            .returning()

        if (!account) {
            throw Boom.notFound('Account was not found.')
        }

        return c.json({ data: account })
    } catch (err: any) {
        if (Boom.isBoom(err)) throw err

        const code = _.get(err, 'cause.code', null)

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
