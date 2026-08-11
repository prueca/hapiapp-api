import 'dotenv/config'
import { parseArgs } from 'util'
import { existsSync } from 'fs'
import assert from 'assert'
import _ from 'lodash'
import { sequelize } from '@/lib/db'
import account from './populate.account'

const script = {
    account,
}

const main = async () => {
    try {
        await sequelize.sync()

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

        if (!existsSync(source)) {
            throw new Error('File not found')
        }

        const fn = script[table as keyof typeof script]
        const mock = (await import(source as string)).default

        if (!fn) {
            throw new Error('Not implemented')
        }

        await fn(mock)
    } catch (e: any) {
        console.log(e.message)
    }
}

main()
