import AccountType from '@/lib/db/accountType'
import { Model } from 'sequelize'

export default async function accountTypeGetById(
    id: string,
): Promise<Model<any, any> | null> {
    const accountType = await AccountType.findByPk(id)
    return accountType
}