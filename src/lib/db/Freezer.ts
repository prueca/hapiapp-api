import sequelize from './sequelize'
import { Model } from 'sequelize'
import commonAttr from './attributes.common'

const attributes = {
    id: {
        ...commonAttr.id,
        primaryKey: true,
    },

    // We create a copy of the object `commonAttr.id` below.
    // This fixes the issue of fields not being created because
    // of the same reference

    freezerTypeId: { ...commonAttr.id },
    accountId: { ...commonAttr.id },
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
