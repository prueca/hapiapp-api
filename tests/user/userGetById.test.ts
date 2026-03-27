import sequelize from '@/lib/db/sequelize'
import userGetById from '@/lib/domains/user/userGetById'
import { beforeAll, describe, expect, it } from 'vitest'
import seed from '../../db/mock/user.seed'

describe('userGetById', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
        seed()
    })

    it('should return a user by id', async () => {
        const id: string = '3c4d5e6f-7081-49a1-32ee-0177j888911b'

        const user = await userGetById(id)

        // Assertions
        expect(user).not.toBeNull()
    })

    it('should return null for non-existent user', async () => {
        const user = await userGetById('non-existent-id')
        expect(user).toBeNull()
    })
})
