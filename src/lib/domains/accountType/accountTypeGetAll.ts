import AccountType from '@/lib/db/accountType'
import { Model, Op } from 'sequelize'

export default async function accountTypeGetAll(
    limit: number = 10,
    after: string | null = null,
    sortBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    account: string | null = null,
): Promise<Model<any, any>[]> {
    const where: any = {}

    if (account) {
        where.account = { [Op.like]: `%${account}%` }
    }

    if (after) {
        const comparison = sortOrder === 'ASC' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: after }
    }

    const accountTypes = await AccountType.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return accountTypes
}
