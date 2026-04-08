import AccountType from '@/lib/db/accountType'
import { Model } from 'sequelize'

export default async function accountTypeCreate(accountData: {
    account: string
}): Promise<Model<any, any>> {
    const accountType = await AccountType.create({
        account: accountData.account,
    })

    return accountType
}