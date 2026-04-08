import AccountType from '@/lib/db/accountType'
import { Model } from 'sequelize'

export default async function accountTypeUpdate(
    id: string,
    accountData: {
        account?: string
    },
): Promise<Model<any, any> | null> {
    const accountType = await AccountType.findByPk(id)

    if (!accountType) {
        return null
    }

    const updateData: any = {}

    if (accountData.account !== undefined) {
        updateData.account = accountData.account
    }

    await accountType.update(updateData)

    return accountType
}