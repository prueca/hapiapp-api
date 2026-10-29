import { Context } from 'hono'
import Boom from '@hapi/boom'
import z from 'zod'
import _ from 'lodash'

import accountTypes from '@/lib/account.types'
import userRoles from '@/lib/user.roles'
import input from '@/lib/input'

import db, { t } from '@/lib/db'

const schema = z.object({
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

export default async (c: Context) => {
    const authAccount = c.get('account')
    const authUser = c.get('user')

    // `scope` defines what account type
    // the authenticated user can create

    let scope: string[] = []

    switch (authUser.role) {
        case userRoles.DISTRIBUTOR_ADMIN:
            scope = [
                accountTypes.DEALER,
                accountTypes.HAPISTORE,
                accountTypes.DIRECT_STORE,
            ]
            break
        default:
            throw Boom.unauthorized('User is not allowed to create account.')
    }

    const data = await input(c, schema)

    if (!scope.includes(data.type)) {
        throw Boom.unauthorized('Account type is not within the scope.')
    }

    _.assign(data, {
        parentId: authAccount.id,
        active: true,
    })

    try {
        const account = await db.transaction(async (txn) => {
            const [newAccount] = await txn
                .insert(t.account)
                .values(data)
                .returning()

            // Allow authenticated user to have access
            // on the newly created account by creating an
            // access record.

            await txn.insert(t.access).values({
                userId: authUser.id,
                accountId: newAccount.id,
            })

            return newAccount
        })

        return c.json({ account })
    } catch (error: any) {
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
