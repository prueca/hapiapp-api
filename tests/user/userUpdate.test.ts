import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import userUpdate from '@/lib/domains/user/userUpdate'
import sequelize from '@/lib/db/sequelize'
import User from '@/lib/db/users'

describe('userUpdate', () => {
    let createdUserId: string

    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    beforeEach(async () => {
        const createdUser = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            middleName: '',
            username: 'johndoe',
            password: 'password123',
            role: '123e4567-e89b-12d3-a456-426614174000',
        })

        createdUserId = createdUser.dataValues.id
    })

    it('should update user successfully', async () => {
        const updatedUser = await userUpdate(createdUserId, {
            firstName: 'Jane',
            lastName: 'Smith',
            username: 'janesmith',
        })

        expect(updatedUser).toBeDefined()
        expect(updatedUser?.dataValues.firstName).toBe('Jane')
        expect(updatedUser?.dataValues.lastName).toBe('Smith')
        expect(updatedUser?.dataValues.username).toBe('janesmith')
    })

    it('should update user with middle name', async () => {
        const updatedUser = await userUpdate(createdUserId, {
            middleName: 'Michael',
        })

        expect(updatedUser).toBeDefined()
        expect(updatedUser?.dataValues.middleName).toBe('Michael')
    })

    it('should update user with empty middle name when not provided', async () => {
        const updatedUser = await userUpdate(createdUserId, {
            middleName: '',
        })

        expect(updatedUser).toBeDefined()
        expect(updatedUser?.dataValues.middleName).toBe('')
    })

    it('should hash the password correctly', async () => {
        const updatedUser = await userUpdate(createdUserId, {
            password: 'newpassword',
        })

        expect(updatedUser).toBeDefined()
        expect(updatedUser?.dataValues.password).not.toBe('newpassword')
        expect(updatedUser?.dataValues.password).toMatch(/^\$2b\$10\$/)
    })

    it('should return null when user not found', async () => {
        const updatedUser = await userUpdate('non-existent-id', {
            firstName: 'Jane',
        })

        expect(updatedUser).toBeNull()
    })

    it('should only update provided fields', async () => {
        const originalUsername = 'johndoe'
        const originalRole = '123e4567-e89b-12d3-a456-426614174001'

        const updatedUser = await userUpdate(createdUserId, {
            firstName: 'Jane',
            role: originalRole,
        })

        expect(updatedUser).toBeDefined()
        expect(updatedUser?.dataValues.firstName).toBe('Jane')
        expect(updatedUser?.dataValues.username).toBe(originalUsername)
        expect(updatedUser?.dataValues.role).toBe(originalRole)
    })
})
