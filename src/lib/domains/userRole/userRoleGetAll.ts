import UserRole from '@/lib/db/userRole'
import { Model, Op } from 'sequelize'

export default async function userRoleGetAll(
    limit: number = 10,
    after: string | null = null,
    sortBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
): Promise<Model<any, any>[]> {
    const where: any = {}

    if (after) {
        const comparison = sortOrder === 'ASC' ? Op.gt : Op.lt
        where[sortBy] = { [comparison]: after }
    }

    const userRoles = await UserRole.findAll({
        limit,
        where,
        order: [[sortBy, sortOrder]],
    })

    return userRoles
}
