import Account from '@/lib/db/account'
import { Model } from 'sequelize'

export default async function accountGetById(
    id: string,
): Promise<Model<any, any> | null> {
    const account = await Account.findByPk(id)
    return account
}