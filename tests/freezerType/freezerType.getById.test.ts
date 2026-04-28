import { expect, test } from 'bun:test'
import { app } from '@/app'
import z from 'zod'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

test('GET /api/freezer_types/:id shoud return a record', async () => {
    const freezerTypeId = '01KQ04VBQYZ4SWNP1FE4NJBDSY'
    const req = new Request(`${BASE_URL}/freezer_types/${freezerTypeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const res = await app.fetch(req)
    const body = await res.json()
    const schema = z.object({
        data: z.object({
            id: z.string(),
            brand: z.string(),
            type: z.string(),
            year: z.number(),
            capacity: z.string(),
        }),
    })
    const parsed = schema.safeParse(body)

    expect(res.status).toBe(200)
    expect(parsed.success).toBe(true)
})
