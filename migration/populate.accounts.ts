import mongoist from 'mongoist'
import _ from 'lodash'

export default async (db: mongoist.Database, mock: Record<string, any>[]) => {
    for (const item of mock) {
        let record: Record<string, any> = _.pick(item, [
            'id',
            'name',
            'address',
            'phone',
            'isr_code',
            'sap_code',
            'company_code',
            'account_type',
            'account_type',
            'associate_id',
        ])

        record = _.mapKeys(record, (v, k) => _.camelCase(k))

        await db.Accounts.insert(record)
    }

    /**
     * Replace assocationId with ObjectId
     */

    const records = await db.Accounts.find()

    for (const record of records) {
        if (['dealer', 'franchisee'].includes(record.accountType)) {
            const parent = await db.Accounts.findOne({
                id: record.associateId,
            })

            await db.Accounts.update(
                {
                    _id: record._id,
                },
                {
                    $set: {
                        associateId: parent._id,
                    },
                },
                {
                    multi: false,
                },
            )
        }
    }

    /**
     * Remove id for all accounts.
     * Remove id and associateId for distributors and franchisees.
     */

    await db.Accounts.update(
        {
            accountType: 'distributor',
        },
        {
            $unset: {
                id: null,
                associateId: null,
            },
        },
        {
            multi: true,
        },
    )

    await db.Accounts.update(
        {
            accountType: {
                $in: ['dealer', 'franchisee'],
            },
        },
        {
            $unset: {
                id: null,
            },
        },
        {
            multi: true,
        },
    )
}
