import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import accountTypeGetAll from '@/lib/domains/accountType/accountTypeGetAll'
import sequelize from '@/lib/db/sequelize'
import seedAccountType from '~/mock/accountType.seed'

describe('accountTypeGetAll', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
        seedAccountType()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should return an array of account types', async () => {
        const accountTypes = await accountTypeGetAll()
        expect(accountTypes.length).toBeGreaterThanOrEqual(1)
        expect(Array.isArray(accountTypes)).toBe(true)
    })

    it('cursor-based pagination: uses after parameter to fetch subsequent pages', async () => {
        // Get first 3 account types sorted by createdAt in ASC order
        const firstPage = await accountTypeGetAll(3, null, 'createdAt', 'ASC')
        expect(firstPage.length).toBe(3)

        // Extract cursor from the last account type's createdAt timestamp
        const cursor = firstPage[firstPage.length - 1].dataValues.createdAt

        // Use cursor to fetch next page account types (those created after the cursor)
        const secondPage = await accountTypeGetAll(
            3,
            cursor,
            'createdAt',
            'ASC',
        )
        expect(secondPage).toHaveLength(3)

        // All account types in second page should have createdAt after the cursor
        for (const accountType of secondPage) {
            expect(accountType.dataValues.createdAt.getTime()).toBeGreaterThan(
                cursor.getTime(),
            )
        }

        // Ensure proper chronological ordering within the page
        for (let i = 0; i < secondPage.length - 1; i++) {
            expect(
                secondPage[i].dataValues.createdAt.getTime(),
            ).toBeLessThanOrEqual(
                secondPage[i + 1].dataValues.createdAt.getTime(),
            )
        }
    })

    it('cursor-based pagination: works correctly with DESC order', async () => {
        // Get first 3 account types sorted by createdAt in DESC order
        const firstPage = await accountTypeGetAll(3, null, 'createdAt', 'DESC')
        expect(firstPage.length).toBe(3)

        // Extract cursor from the first account type (newest account type)
        const cursor = firstPage[0].dataValues.createdAt

        // Use cursor to fetch next page account types (those created before the cursor in DESC order)
        const secondPage = await accountTypeGetAll(
            3,
            cursor,
            'createdAt',
            'DESC',
        )
        expect(secondPage).toHaveLength(3)

        // All account types in second page should have createdAt before the cursor
        for (const accountType of secondPage) {
            expect(accountType.dataValues.createdAt.getTime()).toBeLessThan(
                cursor.getTime(),
            )
        }

        // Ensure proper chronological ordering in descending order
        for (let i = 0; i < secondPage.length - 1; i++) {
            expect(
                secondPage[i].dataValues.createdAt.getTime(),
            ).toBeGreaterThanOrEqual(
                secondPage[i + 1].dataValues.createdAt.getTime(),
            )
        }
    })

    it('should filter account types by account using LIKE', async () => {
        const filteredAccountTypes = await accountTypeGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            'distributor',
        )
        expect(filteredAccountTypes.length).toBeGreaterThan(0)
        for (const accountType of filteredAccountTypes) {
            expect(accountType.dataValues.account.toLowerCase()).toContain(
                'dealer',
            )
        }
    })

    it('should return all account types when no filter is provided', async () => {
        const allAccountTypes = await accountTypeGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            null,
        )
        expect(allAccountTypes.length).toBeGreaterThan(0)
    })
})
