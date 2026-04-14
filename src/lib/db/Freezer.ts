import sequelize from './sequelize'
import { Model } from 'sequelize'
import { ulid } from '@/lib/util'

const attributes = {
    id: {
        ...ulid.attr(),
        primaryKey: true,
    },
    freezerTypeId: ulid.attr(),
    accountId: ulid.attr(),
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'freezer',
    timestamps: true,
    paranoid: true,
}

class Freezer extends Model {}

Freezer.init(attributes, options)

export default Freezer
