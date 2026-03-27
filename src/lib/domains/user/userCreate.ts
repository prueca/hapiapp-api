import User from '@/lib/db/users'
import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

export default async function userCreate(userData: {
    firstName: string
    middleName?: string
    lastName: string
    username: string
    password: string
    role: string
}): Promise<Model<any, any>> {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create user
    const user = await User.create({
        firstName: userData.firstName,
        middleName: userData.middleName || '',
        lastName: userData.lastName,
        username: userData.username,
        password: hashedPassword,
        role: userData.role,
    })

    return user
}
