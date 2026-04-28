import { expect, test } from 'bun:test'
import { app } from '@/app'
import z from 'zod'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/api'

test('PUT /api/freezer_types/:id should update a record', async () => {
    const freezerTypeId = '01KQ04VBQYZ4SWNP1FE4NJBDSY'
    const req = new Request(`${BASE_URL}/freezer_types/${freezerTypeId}`, {
        method: 'PUT',
        body: JSON.stringify({
            brand: 'Haier - edited',
            type: 'swing-up',
            year: 2021,
            capacity: '16cu',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const res = await app.fetch(req)
    let body = await res.json()

    if (body.data) {
        body.data = _.pick(body.data, ['brand', 'type', 'year', 'capacity'])
    }

    expect(res.status).toBe(200)
    expect(body.data).toEqual({
        brand: 'Haier - edited',
        type: 'swing-up',
        year: 2021,
        capacity: '16cu',
    })
})

test('PUT /api/freezer_types/:id should resolve to conflict', async () => {
    const freezerTypeId = '01KQ04VBQYZ4SWNP1FE4NJBDSY'
    const req = new Request(`${BASE_URL}/freezer_types/${freezerTypeId}`, {
        method: 'PUT',
        body: JSON.stringify({
            brand: 'Haier - edited',
            type: 'swing-up',
            year: 2021,
            capacity: '16cu',
        }),
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
