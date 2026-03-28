import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import userCreate from '@/lib/domains/user/userCreate'
import sequelize from '@/lib/db/sequelize'

describe('userCreate', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a user successfully', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            password: 'password123',
            role: '123e4567-e89b-12d3-a456-426614174000',
        }

        const createdUser = await userCreate(userData)

        expect(createdUser).toBeDefined()
        expect(createdUser.dataValues.id).toBeDefined()
        expect(createdUser.dataValues.firstName).toBe('John')
        expect(createdUser.dataValues.lastName).toBe('Doe')
        expect(createdUser.dataValues.username).toBe('johndoe')
        expect(createdUser.dataValues.password).not.toBe('password123') // Password should be hashed
        expect(createdUser.dataValues.role).toBe(
            '123e4567-e89b-12d3-a456-426614174000',
        )
    })

    it('should create a user with middle name', async () => {
        const userData = {
            firstName: 'John',
            middleName: 'Michael',
            lastName: 'Doe',
            username: 'johndoe2',
            password: 'password123',
            role: '123e4567-e89b-12d3-a456-426614174001',
        }

        const createdUser = await userCreate(userData)

        expect(createdUser).toBeDefined()
        expect(createdUser.dataValues.middleName).toBe('Michael')
    })

    it('should create a user with empty middle name when not provided', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe3',
            password: 'password123',
            role: '123e4567-e89b-12d3-a456-426614174002',
        }

        const createdUser = await userCreate(userData)

        expect(createdUser).toBeDefined()
        expect(createdUser.dataValues.middleName).toBe('')
    })

    it('should hash the password correctly', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe4',
            password: 'mypassword',
            role: '123e4567-e89b-12d3-a456-426614174003',
        }

        const createdUser = await userCreate(userData)

        expect(createdUser).toBeDefined()
        expect(createdUser.dataValues.password).not.toBe('mypassword')
        expect(createdUser.dataValues.password).toMatch(/^\$2b\$10\$/)
    })
})
