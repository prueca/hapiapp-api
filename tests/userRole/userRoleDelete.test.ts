import { describe, it, expect, afterAll, beforeEach } from 'vitest'
import userRoleDelete from '@/lib/domains/userRole/userRoleDelete'
import sequelize from '@/lib/db/sequelize'
import UserRole from '@/lib/db/userRole'

describe('userRoleDelete', () => {
    let createdUserRole: string

    // beforeAll(async () => {
    //     await sequelize.sync({ force: true })
    // })

    afterAll(async () => {
        await sequelize.close()
    })

    beforeEach(async () => {
        await sequelize.sync({ force: true })
        const createdUserRoleInstance = await UserRole.create({
            role: 'admin',
        })

        createdUserRole = createdUserRoleInstance.dataValues.id
    })

    it('should delete user role successfully', async () => {
        const deletedUserRole = await userRoleDelete(createdUserRole)

        expect(deletedUserRole).toBeDefined()
        expect(deletedUserRole?.dataValues.id).toBe(createdUserRole)
        expect(deletedUserRole?.dataValues.role).toBe('admin')
    })

    it('should return null when user role not found', async () => {
        const deletedUserRole = await userRoleDelete('non-existent-id')
        console.debug({ deletedUserRole: deletedUserRole })

        expect(deletedUserRole).toBeNull()
    })

    it('should delete user role and verify it no longer exists', async () => {
        await userRoleDelete(createdUserRole)

        const foundUserRole = await UserRole.findByPk(createdUserRole)

        expect(foundUserRole).toBeNull()
    })
})
