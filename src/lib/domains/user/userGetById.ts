import User from '@/lib/db/users'
import { Model } from 'sequelize'

export default async function userGetById(
    id: string,
): Promise<Model<any, any> | null> {
    const user = await User.findByPk(id)
    return user
}
