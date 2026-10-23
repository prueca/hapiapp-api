import {
    pgTable,
    varchar,
    boolean,
    timestamp,
    pgEnum,
} from 'drizzle-orm/pg-core'

import ulid from '../ulid'
import userRoles from '../user.roles'

const userRoleEnum = pgEnum('user_role', [
    userRoles.DISTRIBUTOR_ADMIN,
    userRoles.DISTRIBUTOR_USER,
    userRoles.DEALER_ADMIN,
    userRoles.DEALER_USER,
    userRoles.HAPISTORE_ADMIN,
    userRoles.HAPISTORE_USER,
    userRoles.DIRECT_STORE_ADMIN,
    userRoles.DIRECT_STORE_USER,
])

const user = pgTable('user', {
    id: varchar('id', { length: 26 }).primaryKey().$defaultFn(ulid.generate),

    role: userRoleEnum('role').notNull(),
    active: boolean('active').notNull().default(true),

    firstName: varchar('first_name', { length: 255 }).notNull(),
    middleName: varchar('middle_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 32 }).notNull(),

    username: varchar('username', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
})

export default user
