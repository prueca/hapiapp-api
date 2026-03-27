import User from '@/lib/db/users'
import { Model } from 'sequelize'

export default async function userDelete(id: string): Promise<Model<any, any> | null> {
    const user = await User.findByPk(id)

    if (!user) {
        return null
    }

    await user.destroy()

    return user
}