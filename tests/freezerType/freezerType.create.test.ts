import { expect, describe, test } from 'bun:test'
import { app } from '@/app'
import z from 'zod'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

test('POST /api/freezer_types should create a freezer type', async () => {
    const req = new Request(`${BASE_URL}/freezer_types`, {
        method: 'POST',
        body: JSON.stringify({
            brand: 'Haier',
            type: 'swing-up',
            year: 2021,
            capacity: '16cu',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const res = await app.fetch(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toEqual({
        brand: 'Haier',
        type: 'swing-up',
        year: 2021,
        capacity: '16cu',
    })
})

test('POST /api/freezer_types should resolve to conflict', async () => {
    const req = new Request(`${BASE_URL}/freezer_types`, {
        method: 'POST',
        body: JSON.stringify({
            brand: 'Haier',
            type: 'swing-up',
            year: 2021,
            capacity: '16cu',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const res = await app.fetch(req)
    const data = await res.json()

    expect(res.status).toBe(409)
    expect(data).toEqual({
        message: 'Conflict',
        cause: 'SequelizeUniqueConstraintError',
    })
})
