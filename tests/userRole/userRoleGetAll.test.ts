import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import userRoleGetAll from '@/lib/domains/userRole/userRoleGetAll'
import sequelize from '@/lib/db/sequelize'
import seedUserRole from '~/mock/userRole.seed'

describe('userRoleGetAll', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
        seedUserRole()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should return an array of user roles', async () => {
        const userRoles = await userRoleGetAll(3)
        expect(userRoles.length).toBeGreaterThanOrEqual(3)
        expect(Array.isArray(userRoles)).toBe(true)
    })

    it('cursor-based pagination: uses after parameter to fetch subsequent pages', async () => {
        // Get first 3 user roles sorted by createdAt in ASC order (default)
        const firstPage = await userRoleGetAll(3)
        expect(firstPage.length).toBe(3)

        // Extract cursor from the last user role's createdAt timestamp
        const cursor = firstPage[firstPage.length - 1].dataValues.createdAt

        // Use cursor to fetch next page user roles (those created after the cursor)
        const secondPage = await userRoleGetAll(3, cursor, 'createdAt', 'ASC')
        expect(secondPage).toHaveLength(2)

        // All user roles in second page should have createdAt after the cursor
        for (const userRole of secondPage) {
            expect(userRole.dataValues.createdAt.getTime()).toBeGreaterThan(
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
        // Get first 3 user roles sorted by createdAt in DESC order
        const firstPage = await userRoleGetAll(3, null, 'createdAt', 'DESC')
        expect(firstPage.length).toBe(3)

        // Extract cursor from the first user role (newest user role)
        const cursor = firstPage[0].dataValues.createdAt

        // Use cursor to fetch next page user roles (those created before the cursor in DESC order)
        const secondPage = await userRoleGetAll(3, cursor, 'createdAt', 'DESC')
        expect(secondPage).toHaveLength(3)

        // All user roles in second page should have createdAt before the cursor
        for (const userRole of secondPage) {
            expect(userRole.dataValues.createdAt.getTime()).toBeLessThan(
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

    it('should filter user roles by role name using LIKE', async () => {
        const filteredUserRoles = await userRoleGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            'admin',
        )
        expect(filteredUserRoles.length).toBeGreaterThan(0)
        for (const userRole of filteredUserRoles) {
            expect(userRole.dataValues.role.toLowerCase()).toContain('admin')
        }
    })

    it('should filter user roles by role name with partial match', async () => {
        const filteredUserRoles = await userRoleGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            'user',
        )
        expect(filteredUserRoles.length).toBeGreaterThan(0)
        for (const userRole of filteredUserRoles) {
            expect(userRole.dataValues.role.toLowerCase()).toContain('user')
        }
    })

    it('should return all user roles when no filter is provided', async () => {
        const allUserRoles = await userRoleGetAll(
            10,
            null,
            'createdAt',
            'DESC',
            null,
        )
        expect(allUserRoles.length).toBeGreaterThan(0)
    })
})
