import { expect, test } from 'bun:test'
import { app } from '@/app'
import z from 'zod'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

test('DELETE /api/freezer_types/:id should delete a record', async () => {
    const freezerTypeId = '01KQ04QVCC022YP9Z5JAW3SR28'
    const req = new Request(`${BASE_URL}/freezer_types/${freezerTypeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const res = await app.fetch(req)
    const body = await res.json()
    const deletedAt = body?.data?.deletedAt ?? null

    expect(res.status).toBe(200)
    expect(deletedAt).not.toBeNull()
})
