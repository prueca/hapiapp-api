import { expect, test, describe } from 'bun:test'
import { app } from '@/app'
import z from 'zod'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

describe('Freezer Status Type - Fetch Endpoint', () => {
    test('GET /api/freezer_types/:id shoud return a record', async () => {
        const recordId = '01KQCF8WND34BB2TXW117AJGY5'
        const req = new Request(
            `${BASE_URL}/freezer_status_types/${recordId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        const res = await app.fetch(req)
        const response = await res.json()
        const schema = z.object({
            data: z.object({
                id: z.string(),
                type: z.string(),
            }),
        })
        const parsed = schema.safeParse(response)

        expect(res.status).toBe(200)
        expect(parsed.success).toBe(true)
    })
})
