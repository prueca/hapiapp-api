import UserRole from '@/lib/db/userRole'
import { Model } from 'sequelize'

export default async function userRoleCreate(userRoleData: {
    role: string
}): Promise<Model<any, any>> {
    const userRole = await UserRole.create({
        role: userRoleData.role,
    })

    return userRole
}