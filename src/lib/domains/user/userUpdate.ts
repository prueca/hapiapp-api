import User from '@/lib/db/users'
import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

export default async function userUpdate(
    id: string,
    userData: {
        firstName?: string
        middleName?: string
        lastName?: string
        username?: string
        password?: string
        role?: string
    },
): Promise<Model<any, any> | null> {
    const user = await User.findByPk(id)

    if (!user) {
        return null
    }

    const updateData: any = {}

    if (userData.firstName !== undefined) {
        updateData.firstName = userData.firstName
    }
    if (userData.middleName !== undefined) {
        updateData.middleName = userData.middleName
    }
    if (userData.lastName !== undefined) {
        updateData.lastName = userData.lastName
    }
    if (userData.username !== undefined) {
        updateData.username = userData.username
    }
    if (userData.password !== undefined) {
        updateData.password = await bcrypt.hash(userData.password, 10)
    }
    if (userData.role !== undefined) {
        updateData.role = userData.role
    }

    await user.update(updateData)

    return user
}
