import { expect, test, describe } from 'bun:test'
import { app } from '@/app'
import z from 'zod'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

describe('Freezer Status Type - Search Endpoint', () => {
    test('POST /api/freezer_types/search should return an array of records', async () => {
        const req = new Request(`${BASE_URL}/freezer_status_types/search`, {
            method: 'POST',
            body: JSON.stringify({
                limit: 100,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.fetch(req)
        const response = await res.json()
        const schema = z.object({
            data: z.array(
                z.object({
                    id: z.string(),
                    type: z.string(),
                }),
            ),
        })
        const parsed = schema.safeParse(response)

        expect(res.status).toBe(200)
        expect(parsed.success).toBe(true)
    })
})
