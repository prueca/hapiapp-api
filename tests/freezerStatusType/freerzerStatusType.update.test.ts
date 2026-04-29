import { expect, test, describe } from 'bun:test'
import { app } from '@/app'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

describe('Freezer StatusType - Update Endpoint', () => {
    test('PUT /api/freezer_status_types/:id should update a record', async () => {
        const recordId = '01KQCF8WND34BB2TXW117AJGY5'
        const req = new Request(
            `${BASE_URL}/freezer_status_types/${recordId}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    type: 'for_delivery - edited',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        const res = await app.fetch(req)

        expect(res.status).toBe(200)
    })

    test('PUT /api/freezer_status_types/:id should resolve to conflict', async () => {
        const recordId = '01KQCF8WND34BB2TXW117AJGY5'
        const req = new Request(
            `${BASE_URL}/freezer_status_types/${recordId}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    type: 'assigned',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        const res = await app.fetch(req)
        const response = await res.json()

        expect(res.status).toBe(409)
        expect(response).toEqual({
            message: 'Conflict',
            cause: 'SequelizeUniqueConstraintError',
        })
    })
})
