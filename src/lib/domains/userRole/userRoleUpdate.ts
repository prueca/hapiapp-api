import UserRole from '@/lib/db/userRole'
import { Model } from 'sequelize'

export default async function userRoleUpdate(
    id: string,
    userRoleData: {
        role?: string
    },
): Promise<Model<any, any> | null> {
    const userRole = await UserRole.findByPk(id)

    if (!userRole) {
        return null
    }

    const updateData: any = {}

    if (userRoleData.role !== undefined) {
        updateData.role = userRoleData.role
    }

    await userRole.update(updateData)

    return userRole
}