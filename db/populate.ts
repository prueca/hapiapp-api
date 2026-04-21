import 'dotenv/config'
import { parseArgs } from 'node:util'
import assert from 'assert'
import db from '@/lib/db'
import csv from 'csvtojson'

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

for (const row of rows) {
    console.log(row)
    await model.upsert(row)
}

console.log(`Table '${model.tableName}' populated successfully.`)
