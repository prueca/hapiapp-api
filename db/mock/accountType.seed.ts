import AccountType from '@/lib/db/accountType'
import sequelize from '@/lib/db/sequelize'
import { mockAccountTypes } from './accountType.mock'

export default async function () {
    try {
        ;(await AccountType.bulkCreate(mockAccountTypes),
            {
                transaction: await sequelize.transaction(),
            })
        console.log('Account type data seeded successfully.')
    } catch (error) {
        console.error('Seed failed:', error)
    }
}
