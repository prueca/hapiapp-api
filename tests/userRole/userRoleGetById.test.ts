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
        const id: string = '3c4d5e6f-7081-49a1-32ee-0177j888911b'

        const userRole = await userRoleGetById(id)

        // Assertions
        expect(userRole).not.toBeNull()
    })

    it('should return null for non-existent user role', async () => {
        const userRole = await userRoleGetById('non-existent-id')
        expect(userRole).toBeNull()
    })
})