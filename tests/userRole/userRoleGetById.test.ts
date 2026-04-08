import sequelize from '@/lib/db/sequelize'
import userRoleGetById from '@/lib/domains/userRole/userRoleGetById'
import { beforeAll, describe, expect, it } from 'vitest'
import seed from '~/mock/userRole.seed'

describe('userRoleGetById', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
        seed()
    })

    it('should return a user role by id', async () => {
        const id: string = '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78'

        const userRole = await userRoleGetById(id)

        // Assertions
        expect(userRole).not.toBeNull()
    })

    it('should return null for non-existent user role', async () => {
        const userRole = await userRoleGetById('non-existent-id')
        expect(userRole).toBeNull()
    })
})
