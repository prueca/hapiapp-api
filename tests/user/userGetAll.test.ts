import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import userGetAll from '@/lib/domains/user/userGetAll'
import sequelize from '@/lib/db/sequelize'
import seed from '~/mock/user.seed'

describe('userGetAll', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
        seed()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should return an array of users', async () => {
        const users = await userGetAll()
        expect(users.length).toBeGreaterThanOrEqual(1)
        expect(Array.isArray(users)).toBe(true)
    })

    it('cursor-based pagination: uses after parameter to fetch subsequent pages', async () => {
        // Get first 3 users sorted by createdAt in ASC order
        const firstPage = await userGetAll(3, null, 'createdAt', 'ASC')
        expect(firstPage.length).toBe(3)

        // Extract cursor from the last user's createdAt timestamp
        const cursor = firstPage[firstPage.length - 1].dataValues.createdAt

        // Use cursor to fetch next page users (those created after the cursor)
        const secondPage = await userGetAll(3, cursor, 'createdAt', 'ASC')
        expect(secondPage).toHaveLength(3)

        // All users in second page should have createdAt after the cursor
        for (const user of secondPage) {
            expect(user.dataValues.createdAt.getTime()).toBeGreaterThan(
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
        // Get first 3 users sorted by createdAt in DESC order
        const firstPage = await userGetAll(3, null, 'createdAt', 'DESC')
        expect(firstPage.length).toBe(3)

        // Extract cursor from the first user (newest user)
        const cursor = firstPage[0].dataValues.createdAt

        // Use cursor to fetch next page users (those created before the cursor in DESC order)
        const secondPage = await userGetAll(3, cursor, 'createdAt', 'DESC')
        expect(secondPage).toHaveLength(3)

        // All users in second page should have createdAt before the cursor
        for (const user of secondPage) {
            expect(user.dataValues.createdAt.getTime()).toBeLessThan(
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

    it('should filter users by username using LIKE', async () => {
        const filteredUsers = await userGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            'coyote',
        )
        expect(filteredUsers.length).toBeGreaterThan(0)
        for (const user of filteredUsers) {
            expect(user.dataValues.username.toLowerCase()).toContain('coyote')
        }
    })

    it('should filter users by firstName using LIKE', async () => {
        const filteredUsers = await userGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            null,
            'bugs',
        )
        expect(filteredUsers.length).toBeGreaterThan(0)
        for (const user of filteredUsers) {
            expect(user.dataValues.firstName.toLowerCase()).toContain('bugs')
        }
    })

    it('should filter users by lastName using LIKE', async () => {
        const filteredUsers = await userGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            null,
            null,
            'fudd',
        )
        expect(filteredUsers.length).toBeGreaterThan(0)
        for (const user of filteredUsers) {
            expect(user.dataValues.lastName.toLowerCase()).toContain('fudd')
        }
    })

    it('should return all users when no filter is provided', async () => {
        const allUsers = await userGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            null,
            null,
            null,
        )
        expect(allUsers.length).toBeGreaterThan(0)
    })
})
