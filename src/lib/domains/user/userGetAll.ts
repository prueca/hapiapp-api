import User from '@/lib/db/users'
import { Model, Op } from 'sequelize'

export default async function userGetAll(
    limit: number = 10,
    after: string | null = null,
    sortBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    username: string | null = null,
    firstName: string | null = null,
    lastName: string | null = null,
): Promise<Model<any, any>[]> {
    const where: any = {}

    if (username) {
        where.username = { [Op.like]: `%${username}%` }
    }

    if (firstName) {
        where.firstName = { [Op.like]: `%${firstName}%` }
    }

    if (lastName) {
        where.lastName = { [Op.like]: `%${lastName}%` }
    }

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
