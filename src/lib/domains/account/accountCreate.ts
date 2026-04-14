import Account from '@/lib/db/account'
import { Model } from 'sequelize'

export default async function accountCreate(accountData: {
    name: string
    address: string
    isrCode?: string
    sapCode?: string
    companyCode: string
    accountTypeId: string
    userId: string
}): Promise<Model<any, any>> {
    const account = await Account.create({
        name: accountData.name,
        address: accountData.address,
        isrCode: accountData.isrCode,
        sapCode: accountData.sapCode,
        companyCode: accountData.companyCode,
        accountTypeId: accountData.accountTypeId,
        userId: accountData.userId,
    })

    return account
}