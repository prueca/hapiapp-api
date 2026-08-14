import 'dotenv/config'
import _ from 'lodash'
import z from 'zod'
import { Op } from 'sequelize'

import db, { sequelize } from '../src/lib/db'

const FRESH = true
const SOURCE = './mock/users.json'

type PlainObject = {
    [key: string]: any
}

const main = async () => {
    const txn = await sequelize.transaction()

    try {
        await db.Access.sync({ force: FRESH })

        const schema = z.object({
            userId: z.ulid(),
            accountId: z.ulid(),
        })

        /**
         * Populate table
         */

        const mock: PlainObject[] = (await import(SOURCE)).default

        let access = await Promise.all(
            _.map(mock, async (item) => {
                let record: PlainObject = {
                    userId: item.id,
                    accountId: item.account_id,
                }

                record = schema.parse(record)

                return record
            }),
        )

        await db.Access.bulkCreate(access, { transaction: txn })

        db.Access.belongsTo(db.User, {
            as: 'user',
            foreignKey: 'userId',
        })

        db.Access.belongsTo(db.Account, {
            as: 'account',
            foreignKey: 'accountId',
        })

        const orphaned = await db.Access.findAll({
            include: [
                {
                    model: db.User,
                    as: 'user',
                    required: false,
                },
                {
                    model: db.Account,
                    as: 'account',
                    required: false,
                },
            ],
            where: {
                [Op.or]: [{ '$user.id$': null }, { '$account.id$': null }],
            },
            transaction: txn,
        })

        if (orphaned.length) {
            throw new Error(`Found ${orphaned.length} orphaned access`)
        }

        await txn.commit()
    } catch (e: any) {
        await txn.rollback()

        console.log(e.message)
    }
}

main()
