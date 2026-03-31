import UserRole from '@/lib/db/userRole'
import { Model } from 'sequelize'

export default async function userRoleDelete(id: string): Promise<Model<any, any> | null> {
    const userRole = await UserRole.findByPk(id)

    if (!userRole) {
        return null
    }

    await userRole.destroy()

    return userRole
}