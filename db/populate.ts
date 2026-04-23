import 'dotenv/config'
import { parseArgs } from 'node:util'
import assert from 'assert'
import db from '@/lib/db'
import csv from 'csvtojson'
import _ from 'lodash'

const { values } = parseArgs({
    options: {
        entity: {
            type: 'string',
            short: 'e',
        },
        data: {
            type: 'string',
            short: 'd',
        },
    },
})

const { entity, data } = values

assert.ok(entity, 'Entity not provided')
assert.ok(data, 'Data not provided')

const rows = await csv().fromFile(data)
const model = db[entity as keyof typeof db]
let row: any

await model.sync()

try {
    for (row of rows) {
        const sanitized = _.mapValues(row, (v) => (v === '' ? null : v))
        await model.upsert(sanitized)
    }

    console.log(`Table '${model.tableName}' populated successfully.`)
} catch (err: any) {
    switch (err.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            console.log(row)
            console.error(`${err.name}: ${err.message}`)
            break

        default:
            throw err
    }
}
