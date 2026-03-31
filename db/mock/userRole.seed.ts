import { UserRole } from '@/lib/db'
import sequelize from '@/lib/db/sequelize'
import { mockUserRoles } from './userRole.mock'

export default async function () {
    try {
        ;(await UserRole.bulkCreate(mockUserRoles),
            { transaction: await sequelize.transaction() },
            console.log('Data seeded successfully.'))
    } catch (error) {
        console.error('Seed failed:', error)
    }
}
