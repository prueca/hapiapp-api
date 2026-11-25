import { Context } from 'hono'
import Boom from '@hapi/boom'
import z from 'zod'
import _ from 'lodash'

import input from '@/lib/input'

import db, { t } from '@/lib/db'
import { eq, or, and, getColumns, isNull } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const schema = z.object({
    id: z.ulid(),
})

export default async (c: Context) => {
    const authAccount = c.get('account')
    const data = await input(c, schema)

    const parent = alias(t.account, 'parent')
    const [account] = await db
        .select({ ...getColumns(t.account) })
        .from(t.account)
        .leftJoin(parent, eq(t.account.parentId, parent.id))
        .where(
            and(
                eq(t.account.id, data.id),
                or(
                    eq(t.account.parentId, authAccount.id),
                    eq(parent.parentId, authAccount.id),
                ),
                isNull(t.account.deletedAt),
            ),
        )
        .limit(1)

    if (!account) {
        throw Boom.notFound('Account was not found.')
    }

    return c.json({ data: account })
}
