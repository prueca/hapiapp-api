import { expect, test, describe } from 'bun:test'
import { app } from '@/app'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

describe('Freezer StatusType - Update Endpoint', () => {
    test('PUT /api/freezer_status_types/:id should update a record', async () => {
        const recordId = '01KQEA22CXDN2NT0N0XRZRGXH8'
        const data = { type: 'for_delivery - edited' }

        const req = new Request(
            `${BASE_URL}/freezer_status_types/${recordId}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        const res = await app.fetch(req)
        const response = await res.json()
        const record = _.pick(response.data, ['type'])

        expect(res.status).toBe(200)
        expect(record).toEqual(data)
    })

    test('PUT /api/freezer_status_types/:id should resolve to conflict', async () => {
        const recordId = '01KQEA22CXDN2NT0N0XRZRGXH8'
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
