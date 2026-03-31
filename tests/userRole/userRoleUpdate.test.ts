import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import userRoleUpdate from '@/lib/domains/userRole/userRoleUpdate'
import sequelize from '@/lib/db/sequelize'
import UserRole from '@/lib/db/userRole'

describe('userRoleUpdate', () => {
    let createdUserRole: string

    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    beforeEach(async () => {
        const createdUserRoleInstance = await UserRole.create({
            role: 'admin',
        })

        createdUserRole = createdUserRoleInstance.dataValues.id
    })

    it('should update user role successfully', async () => {
        const updatedUserRole = await userRoleUpdate(createdUserRole, {
            role: 'user',
        })

        expect(updatedUserRole).toBeDefined()
        expect(updatedUserRole?.dataValues.role).toBe('user')
    })

    it('should update user role with different role name', async () => {
        const updatedUserRole = await userRoleUpdate(createdUserRole, {
            role: 'moderator',
        })

        expect(updatedUserRole).toBeDefined()
        expect(updatedUserRole?.dataValues.role).toBe('moderator')
    })

    it('should update user role with empty role when not provided', async () => {
        const updatedUserRole = await userRoleUpdate(createdUserRole, {
            role: '',
        })

        expect(updatedUserRole).toBeDefined()
        expect(updatedUserRole?.dataValues.role).toBe('')
    })

    it('should return null when user role not found', async () => {
        const updatedUserRole = await userRoleUpdate('non-existent-id', {
            role: 'user',
        })

        expect(updatedUserRole).toBeNull()
    })

    it('should only update provided fields', async () => {
        const originalRole = 'admin'

        const updatedUserRole = await userRoleUpdate(createdUserRole, {
            role: 'user',
        })

        expect(updatedUserRole).toBeDefined()
        expect(updatedUserRole?.dataValues.role).toBe('user')
    })
})