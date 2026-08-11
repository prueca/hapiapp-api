import 'dotenv/config'
import { parseArgs } from 'node:util'
import assert from 'assert'
import mongoist from 'mongoist'
import _ from 'lodash'
import accounts from './populate.accounts'

const script = {
    accounts,
}

const main = async () => {
    const { values } = parseArgs({
        options: {
            table: {
                type: 'string',
                short: 't',
            },
            source: {
                type: 'string',
                short: 's',
            },
        },
    })

    const { table, source } = values

    assert(table, 'table is required')
    assert(source, 'source is required')

    const db = mongoist(process.env.MONGODB_URI as string)
    const mock = (await import(source as string)).default
    const fn = script[table as keyof typeof script]

    fn ? await fn(db, mock) : console.log('No such table')

    await db.close()
}

main()
