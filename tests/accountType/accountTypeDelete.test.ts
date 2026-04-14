import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import accountTypeDelete from '@/lib/domains/accountType/accountTypeDelete'
import sequelize from '@/lib/db/sequelize'
import AccountType from '@/lib/db/accountType'

describe('accountTypeDelete', () => {
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

    it('should delete account type successfully', async () => {
        const deletedAccountType = await accountTypeDelete(createdAccountTypeId)

        expect(deletedAccountType).toBeDefined()
        expect(deletedAccountType?.dataValues.id).toBe(createdAccountTypeId)
        expect(deletedAccountType?.dataValues.account).toBe('admin')
    })

    it('should return null when account type not found', async () => {
        const deletedAccountType = await accountTypeDelete('non-existent-id')
        console.debug({ deletedAccountType: deletedAccountType })

        expect(deletedAccountType).toBeNull()
    })

    it('should delete account type and verify it no longer exists', async () => {
        await accountTypeDelete(createdAccountTypeId)

        const foundAccountType = await AccountType.findByPk(createdAccountTypeId)

        expect(foundAccountType).toBeNull()
    })
})