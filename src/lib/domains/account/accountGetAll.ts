import Account from '@/lib/db/account'
import { Model, Op } from 'sequelize'

export default async function accountGetAll(
    limit: number = 10,
    after: string | null = null,
    sortBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    name?: string | null,
    address?: string | null,
    isrCode?: string | null,
    sapCode?: string | null,
    companyCode?: string | null,
    accountTypeId?: string | null,
    userId?: string | null,
): Promise<Model<any, any>[]> {
    const where: any = {}

    if (name) {
        where.name = { [Op.like]: `%${name}%` }
    }

    if (address) {
        where.address = { [Op.like]: `%${address}%` }
    }

    if (isrCode) {
        where.isrCode = { [Op.like]: `%${isrCode}%` }
    }

    if (sapCode) {
        where.sapCode = { [Op.like]: `%${sapCode}%` }
    }

    if (companyCode) {
        where.companyCode = { [Op.like]: `%${companyCode}%` }
    }

    if (accountTypeId) {
        where.accountTypeId = accountTypeId
    }

    if (userId) {
        where.userId = userId
    }

    if (after) {
        const comparison = sortOrder === 'ASC' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: after }
    }

    const accounts = await Account.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return accounts
}