import { expect, describe, test } from 'bun:test'
import { app } from '@/app'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

describe('Freezer Type - Create Endpoint', () => {
    const data = {
        brand: 'Haier',
        type: 'swing-up',
        year: 2021,
        capacity: '16cu',
    }

    test('POST /api/freezer_types should create a freezer type', async () => {
        const req = new Request(`${BASE_URL}/freezer_types`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.fetch(req)
        const response = await res.json()
        const record = _.pick(response?.data, [
            'id',
            'brand',
            'type',
            'year',
            'capacity',
        ])

        expect(res.status).toBe(200)
        expect(record.id).toBeString()
        expect(_.omit(record, ['id'])).toEqual(data)
    })

    test('POST /api/freezer_types should resolve to conflict', async () => {
        const req = new Request(`${BASE_URL}/freezer_types`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.fetch(req)
        const response = await res.json()

        expect(res.status).toBe(409)
        expect(response).toEqual({
            message: 'Conflict',
            cause: 'SequelizeUniqueConstraintError',
        })
    })
})
