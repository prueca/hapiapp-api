import Account from '@/lib/db/account'
import sequelize from '@/lib/db/sequelize'
import { mockAccounts } from './account.mock'

export default async function () {
    try {
        await Account.bulkCreate(mockAccounts, {
            transaction: await sequelize.transaction(),
        })
        console.log('Account data seeded successfully.')
    } catch (error) {
        console.error('Seed failed:', error)
    }
}