import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import userRoleCreate from '@/lib/domains/userRole/userRoleCreate'
import sequelize from '@/lib/db/sequelize'

describe('userRoleCreate', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a user role successfully', async () => {
        const userRoleData = {
            role: 'admin',
        }

        const createdUserRole = await userRoleCreate(userRoleData)

        expect(createdUserRole).toBeDefined()
        expect(createdUserRole.dataValues.id).toBeDefined()
        expect(createdUserRole.dataValues.role).toBe('admin')
    })

    it('should create a user role with different role name', async () => {
        const userRoleData = {
            role: 'user',
        }

        const createdUserRole = await userRoleCreate(userRoleData)

        expect(createdUserRole).toBeDefined()
        expect(createdUserRole.dataValues.role).toBe('user')
    })

    it('should create a user role with empty role when not provided', async () => {
        const userRoleData = {
            role: '',
        }

        const createdUserRole = await userRoleCreate(userRoleData)

        expect(createdUserRole).toBeDefined()
        expect(createdUserRole.dataValues.role).toBe('')
    })
})