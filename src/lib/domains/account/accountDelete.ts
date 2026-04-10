import Account from '@/lib/db/account'
import { Model } from 'sequelize'

export default async function accountDelete(id: string): Promise<Model<any, any> | null> {
    const account = await Account.findByPk(id)

    if (!account) {
        return null
    }

    await account.destroy()

    return account
}