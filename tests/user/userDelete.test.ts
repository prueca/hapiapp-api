import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import userDelete from '@/lib/domains/user/userDelete'
import sequelize from '@/lib/db/sequelize'
import User from '@/lib/db/users'

describe('userDelete', () => {
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

    it('should delete user successfully', async () => {
        const deletedUser = await userDelete(createdUserId)

        expect(deletedUser).toBeDefined()
        expect(deletedUser?.dataValues.id).toBe(createdUserId)
        expect(deletedUser?.dataValues.firstName).toBe('John')
    })

    it('should return null when user not found', async () => {
        const deletedUser = await userDelete('non-existent-id')
        console.debug({ deletedUser: deletedUser })

        expect(deletedUser).toBeNull()
    })

    it('should delete user and verify it no longer exists', async () => {
        await userDelete(createdUserId)

        const foundUser = await User.findByPk(createdUserId)

        expect(foundUser).toBeNull()
    })
})
