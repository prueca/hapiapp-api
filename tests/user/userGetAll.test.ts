import { beforeAll, describe, expect, test } from 'vitest'
import userGetAll from '@/lib/domains/user/userGetAll'
import sequelize from '@/lib/db/sequelize'
import seed from '~/mock/user.seed'

describe('userGetAll', () => {
    ;(beforeAll(async () => {
        await sequelize.sync({ force: true })
        seed()
    }),
        test('returns an array of users', async () => {
            const users = await userGetAll()
            expect(Array.length).toBeGreaterThanOrEqual(1)
            expect(Array.isArray(users)).toBe(true)
        }))
})
