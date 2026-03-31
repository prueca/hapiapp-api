import UserRole from '@/lib/db/userRole'
import { Model } from 'sequelize'

export default async function userRoleGetById(
    id: string,
): Promise<Model<any, any> | null> {
    const userRole = await UserRole.findByPk(id)
    return userRole
}