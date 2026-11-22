import { Context } from 'hono'
import Boom from '@hapi/boom'
import z from 'zod'
import _ from 'lodash'

import input from '@/lib/input'

import db, { t } from '@/lib/db'
import { eq, or, and, isNull, getColumns } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const schema = z.object({
    id: z.ulid(),
})

const verifyAccess = async (authAccount: Json, accountId: string) => {
    const parent = alias(t.account, 'parent')

    const [account] = await db
        .select({ ...getColumns(t.account) })
        .from(t.account)
        .leftJoin(parent, eq(t.account.parentId, parent.id))
        .where(
            and(
                eq(t.account.id, accountId),
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
    const { id: accountId } = await input(c, schema)

    try {
        await verifyAccess(authAccount, accountId)

        const [account] = await db
            .select()
            .from(t.account)
            .where(
                and(eq(t.account.id, accountId), isNull(t.account.deletedAt)),
            )
            .limit(1)

        return c.json({ data: account })
    } catch (err: any) {
        if (Boom.isBoom(err)) throw err

        const code = _.get(err, 'cause.code', null)

        switch (code) {
            case '23505':
                throw Boom.conflict('The data already exists.')

            case '23503':
                throw Boom.badData('Foreign key violation.')

            case '23502':
                throw Boom.badRequest('Missing required field.')

            case '23514':
                throw Boom.badRequest('Check constraint violation.')

            case '22P02':
                throw Boom.badRequest('Invalid data format.')
        }

        throw Boom.internal('An unexpected error occurred.')
    }
}
