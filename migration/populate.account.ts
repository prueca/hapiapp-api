import db from '@/lib/db'
import _ from 'lodash'

export default async (mock: Record<string, any>[]) => {
    for (const item of mock) {
        let record: Record<string, any> = _.pick(item, [
            'id',
            'type',
            'name',
            'address',
            'phone',
            'isr_code',
            'sap_code',
            'company_code',
            'associate_id',
        ])

        record = _.mapKeys(record, (v, k) => _.camelCase(k))

        await db.Account.create(record)
    }
}
