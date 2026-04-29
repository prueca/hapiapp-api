import { expect, test, describe } from 'bun:test'
import { app } from '@/app'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

describe('Freezer Status Type - Delete Endpoint', () => {
    test('DELETE /api/freezer_status_types/:id should delete a record', async () => {
        const recordId = '01KQCF8WND34BB2TXW117AJGY5'
        const req = new Request(
            `${BASE_URL}/freezer_status_types/${recordId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        const res = await app.fetch(req)
        const response = await res.json()
        const deletedAt = response?.data?.deletedAt ?? null

        expect(res.status).toBe(200)
        expect(deletedAt).not.toBeNull()
    })
})
