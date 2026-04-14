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
        const id: string = '3c4d5e6f-7081-49a1-32ee-0177j888911b'

        const accountType = await accountTypeGetById(id)

        // Assertions
        expect(accountType).not.toBeNull()
    })

    it('should return null for non-existent account type', async () => {
        const accountType = await accountTypeGetById('non-existent-id')
        expect(accountType).toBeNull()
    })
})