import 'dotenv/config'
import _ from 'lodash'
import z from 'zod'
import * as argon2 from 'argon2'

import db, { sequelize } from '../src/lib/db'
import userRoles from '../src/lib/config/user.roles'

const FRESH = true
const SOURCE = './mock/users.json'

type PlainObject = {
    [key: string]: any
}

const main = async () => {
    const txn = await sequelize.transaction()

    try {
        await db.User.sync({ force: FRESH })

        const schema = z.object({
            id: z.ulid(),
            role: z.enum([
                userRoles.DISTRIBUTOR_ADMIN,
                userRoles.DISTRIBUTOR_USER,
                userRoles.DEALER_ADMIN,
                userRoles.DEALER_USER,
                userRoles.FRANCHISEE_ADMIN,
                userRoles.FRANCHISEE_USER,
            ]),
            firstName: z.string().nonempty(),
            middleName: z.string().nonempty(),
            lastName: z.string().nonempty(),
            username: z.string().nonempty(),
            password: z.string().nonempty(),
        })

        /**
         * Populate table
         */

        const mock: PlainObject[] = (await import(SOURCE)).default

        let users = await Promise.all(
            _.map(mock, async (item) => {
                let record: PlainObject = _.pick(item, [
                    'id',
                    'role',
                    'first_name',
                    'middle_name',
                    'last_name',
                    'username',
                    'password',
                ])

                record = _.mapKeys(record, (v, k) => _.camelCase(k))
                record = schema.parse(record)
                record.password = await argon2.hash(record.password)

                return record
            }),
        )

        await db.User.bulkCreate(users, { transaction: txn })

        await txn.commit()
    } catch (e: any) {
        await txn.rollback()

        console.log(e.message)
    }
}

main()
