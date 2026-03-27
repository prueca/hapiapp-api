import { User } from '@/lib/db'
import sequelize from '@/lib/db/sequelize'
import { mockUsers } from './user.mock'

export default async function seed() {
    try {
        ;(await User.bulkCreate(mockUsers),
            { transaction: await sequelize.transaction() },
            console.log('Data seeded successfully.'))
    } catch (error) {
        console.error('Seed failed:', error)
    }
}
