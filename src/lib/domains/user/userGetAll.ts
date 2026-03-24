import User from '@/lib/db/users'
import { Model, Op } from 'sequelize'

export default async function userGetAll(
    limit: number = 10,
    after: string | null = null,
    sortBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
): Promise<Model<any, any>[]> {
    const where: any = {}

    if (after) {
        const comparison = sortOrder === 'ASC' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: after }
    }

    const users = await User.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return users
}
