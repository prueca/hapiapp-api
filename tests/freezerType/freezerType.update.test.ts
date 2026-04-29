import { expect, test, describe } from 'bun:test'
import { app } from '@/app'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

describe('Freezer Type - Update Endpoint', () => {
    const data = {
        brand: 'Haier',
        type: 'swing-up',
        year: 2021,
        capacity: '16cu',
    }

    test('PUT /api/freezer_types/:id should update a record', async () => {
        const recordId = '01KQCH62FQC36MBER9VV0X2CSH'
        const req = new Request(`${BASE_URL}/freezer_types/${recordId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.fetch(req)
        const response = await res.json()
        const record = _.pick(response.data, [
            'brand',
            'type',
            'year',
            'capacity',
        ])

        expect(res.status).toBe(200)
        expect(record).toEqual(data)
    })

    test('PUT /api/freezer_types/:id should resolve to conflict', async () => {
        const recordId = '01KQCHKMCB6BV9J9WG6FSGKZQH'
        const req = new Request(`${BASE_URL}/freezer_types/${recordId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.fetch(req)
        const body = await res.json()

        expect(res.status).toBe(409)
        expect(body).toEqual({
            message: 'Conflict',
            cause: 'SequelizeUniqueConstraintError',
        })
    })
})
