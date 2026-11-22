import { Context } from 'hono'
import Boom from '@hapi/boom'
import z from 'zod'
import _ from 'lodash'

import input from '@/lib/input'

import db, { t } from '@/lib/db'
import { eq, or, and, desc, asc, isNull, ilike, getColumns } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const schema = z.object({
    query: z.string().optional(),
})

export default async (c: Context) => {
    const authAccount = c.get('account')
    const data = await input(c, schema)

    // `query` can be account id or name

    const { query } = data
    const queryCondition = query
        ? or(ilike(t.account.name, `%${query}%`), eq(t.account.id, query))
        : undefined

    const parent = alias(t.account, 'parent')

    const items = await db
        .select({ ...getColumns(t.account) })
        .from(t.account)
        .leftJoin(parent, eq(parent.id, t.account.parentId))
        .where(
            and(
                isNull(t.account.deletedAt),
                eq(t.account.active, true),
                or(
                    eq(t.account.parentId, authAccount.id),
                    eq(parent.parentId, authAccount.id),
                ),
                queryCondition,
            ),
        )
        .orderBy(desc(t.account.createdAt), asc(t.account.name))

    return c.json({ data: items })
}
