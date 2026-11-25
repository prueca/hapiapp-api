import { Context } from 'hono'
import Boom from '@hapi/boom'
import * as argon2 from 'argon2'
import { generateUsername } from 'unique-username-generator'
import z from 'zod'
import _ from 'lodash'

import input from '@/lib/input'
import accountTypes from '@/lib/account.types'
import userRoles from '@/lib/user.roles'

import db, { t } from '@/lib/db'
import { eq, or, and, isNull, getColumns } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

type User = typeof t.user.$inferInsert

const DEFAULT_PASSWORD = 'hapi123'

const schema = z.object({
    accountId: z.ulid(),
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
    address: z.string(),
    phone: z.string(),
    isAdmin: z.boolean(),
})

const fetchAccount = async (authAccountId: string, accountId: string) => {
    // This function ensures that we are creating a user for account
    // that is within the scope.

    const parent = alias(t.account, 'parent')

    const [account] = await db
        .select({ ...getColumns(t.account) })
        .from(t.account)
        .leftJoin(parent, eq(parent.id, t.account.parentId))
        .where(
            and(
                eq(t.account.id, accountId),
                isNull(t.account.deletedAt),
                or(
                    eq(t.account.id, authAccountId),
                    eq(t.account.parentId, authAccountId),
                    eq(parent.parentId, authAccountId),
                ),
            ),
        )
        .limit(1)

    if (!account) {
        throw Boom.unauthorized('Account must be within the scope.')
    }

    return account
}

const getUserRole = (accountType: string, isAdmin: boolean) => {
    switch (accountType) {
        case accountTypes.DISTRIBUTOR:
            return isAdmin
                ? userRoles.DISTRIBUTOR_ADMIN
                : userRoles.DISTRIBUTOR_USER

        case accountTypes.DEALER:
            return isAdmin ? userRoles.DEALER_ADMIN : userRoles.DEALER_USER

        case accountTypes.HAPISTORE:
            return isAdmin
                ? userRoles.HAPISTORE_ADMIN
                : userRoles.HAPISTORE_USER

        case accountTypes.DIRECT_STORE:
            return isAdmin
                ? userRoles.DIRECT_STORE_ADMIN
                : userRoles.DIRECT_STORE_USER
    }
}

export default async (c: Context) => {
    const authAccount = c.get('account')
    const data = await input(c, schema)

    try {
        const account = await fetchAccount(authAccount.id, data.accountId)
        const userData = _.pick(data, [
            'firstName',
            'middleName',
            'lastName',
            'address',
            'phone',
        ])

        _.assign(userData, {
            role: getUserRole(account.type, data.isAdmin),
            username: generateUsername('_', 4),
            // We use a default password for the new user.
            // This can be changed later.
            password: await argon2.hash(DEFAULT_PASSWORD),
            active: true,
        })

        const newUser = await db.transaction(async (txn) => {
            const [newUser] = await txn
                .insert(t.user)
                .values(userData as User)
                .returning()

            await txn.insert(t.access).values({
                userId: newUser.id,
                accountId: data.accountId,
            })

            return newUser
        })

        return c.json({
            data: {
                username: newUser.username,
            },
        })
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
