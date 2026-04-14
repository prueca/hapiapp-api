import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import accountTypeCreate from '@/lib/domains/accountType/accountTypeCreate'
import sequelize from '@/lib/db/sequelize'

describe('accountTypeCreate', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create an account type successfully', async () => {
        const accountTypeData = {
            account: 'admin',
        }

        const createdAccountType = await accountTypeCreate(accountTypeData)

        expect(createdAccountType).toBeDefined()
        expect(createdAccountType.dataValues.id).toBeDefined()
        expect(createdAccountType.dataValues.account).toBe('admin')
    })

    it('should create an account type with different account name', async () => {
        const accountTypeData = {
            account: 'user',
        }

        const createdAccountType = await accountTypeCreate(accountTypeData)

        expect(createdAccountType).toBeDefined()
        expect(createdAccountType.dataValues.account).toBe('user')
    })

    it('should create an account type with uppercase account name', async () => {
        const accountTypeData = {
            account: 'SUPER_ADMIN',
        }

        const createdAccountType = await accountTypeCreate(accountTypeData)

        expect(createdAccountType).toBeDefined()
        expect(createdAccountType.dataValues.account).toBe('SUPER_ADMIN')
    })
})