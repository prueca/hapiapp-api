import Account from '@/lib/db/account'
import { Model } from 'sequelize'

export default async function accountUpdate(
    id: string,
    accountData: {
        name?: string
        address?: string
        isrCode?: string
        sapCode?: string
        companyCode?: string
        accountTypeId?: string
        userId?: string
    },
): Promise<Model<any, any> | null> {
    const account = await Account.findByPk(id)

    if (!account) {
        return null
    }

    const updateData: any = {}

    if (accountData.name !== undefined) {
        updateData.name = accountData.name
    }

    if (accountData.address !== undefined) {
        updateData.address = accountData.address
    }

    if (accountData.isrCode !== undefined) {
        updateData.isrCode = accountData.isrCode
    }

    if (accountData.sapCode !== undefined) {
        updateData.sapCode = accountData.sapCode
    }

    if (accountData.companyCode !== undefined) {
        updateData.companyCode = accountData.companyCode
    }

    if (accountData.accountTypeId !== undefined) {
        updateData.accountTypeId = accountData.accountTypeId
    }

    if (accountData.userId !== undefined) {
        updateData.userId = accountData.userId
    }

    await account.update(updateData)

    return account
}