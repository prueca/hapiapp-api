import { pgTable, varchar, unique, timestamp } from 'drizzle-orm/pg-core'

import ulid from '../ulid'
import user from './user'
import account from './account'

const access = pgTable(
    'access',
    {
        id: varchar('id', { length: 26 })
            .primaryKey()
            .$defaultFn(ulid.generate),

        userId: varchar('user_id', { length: 26 })
            .references(() => user.id)
            .notNull(),

        accountId: varchar('account_id', { length: 26 })
            .references(() => account.id)
            .notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
        deletedAt: timestamp('deleted_at'),
    },
    (t) => [unique('access_user_account_unique').on(t.userId, t.accountId)],
)

export default access
