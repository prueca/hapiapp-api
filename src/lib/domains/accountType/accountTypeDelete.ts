import AccountType from '@/lib/db/accountType'
import { Model } from 'sequelize'

export default async function accountTypeDelete(id: string): Promise<Model<any, any> | null> {
    const accountType = await AccountType.findByPk(id)

    if (!accountType) {
        return null
    }

    await accountType.destroy()

    return accountType
}