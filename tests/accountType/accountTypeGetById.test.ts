import sequelize from '@/lib/db/sequelize'
import accountTypeGetById from '@/lib/domains/accountType/accountTypeGetById'
import { beforeAll, describe, expect, it } from 'vitest'
import seed from '~/mock/accountType.seed'

describe('accountTypeGetById', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
        seed()
    })

    it('should return an account type by id', async () => {
        const id: string = '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78'

        const accountType = await accountTypeGetById(id)

        // Assertions
        expect(accountType).not.toBeNull()
    })

    it('should return null for non-existent account type', async () => {
        const accountType = await accountTypeGetById('non-existent-id')
        expect(accountType).toBeNull()
    })
})
