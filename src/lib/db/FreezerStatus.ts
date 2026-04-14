import sequelize from './sequelize'
import { Model, DataTypes } from 'sequelize'
import { ulid } from '@/lib/util'

const attributes = {
    id: {
        ...ulid.attr(),
        primaryKey: true,
    },
    freezerId: ulid.attr(),
    freezerStatusTypeId: ulid.attr(),
    // Todo: Add accountId
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'freezer_status',
    timestamps: true,
    paranoid: true,
}

class FreezerStatus extends Model {}

FreezerStatus.init(attributes, options)

export default FreezerStatus
