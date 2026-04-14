import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import accountTypeUpdate from '@/lib/domains/accountType/accountTypeUpdate'
import sequelize from '@/lib/db/sequelize'
import AccountType from '@/lib/db/accountType'

describe('accountTypeUpdate', () => {
    let createdAccountTypeId: string

    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    beforeEach(async () => {
        const createdAccountType = await AccountType.create({
            account: 'admin',
        })

        createdAccountTypeId = createdAccountType.dataValues.id
    })

    it('should update account type successfully', async () => {
        const updatedAccountType = await accountTypeUpdate(createdAccountTypeId, {
            account: 'super_admin',
        })

        expect(updatedAccountType).toBeDefined()
        expect(updatedAccountType?.dataValues.account).toBe('super_admin')
    })

    it('should update account type with different account name', async () => {
        const updatedAccountType = await accountTypeUpdate(createdAccountTypeId, {
            account: 'user',
        })

        expect(updatedAccountType).toBeDefined()
        expect(updatedAccountType?.dataValues.account).toBe('user')
    })

    it('should update account type with uppercase account name', async () => {
        const updatedAccountType = await accountTypeUpdate(createdAccountTypeId, {
            account: 'SUPER_ADMIN',
        })

        expect(updatedAccountType).toBeDefined()
        expect(updatedAccountType?.dataValues.account).toBe('SUPER_ADMIN')
    })

    it('should return null when account type not found', async () => {
        const updatedAccountType = await accountTypeUpdate('non-existent-id', {
            account: 'admin',
        })

        expect(updatedAccountType).toBeNull()
    })

    it('should only update provided fields', async () => {
        const originalAccount = 'admin'

        const updatedAccountType = await accountTypeUpdate(createdAccountTypeId, {
            account: 'super_admin',
        })

        expect(updatedAccountType).toBeDefined()
        expect(updatedAccountType?.dataValues.account).toBe('super_admin')
    })
})