import sequelize from './sequelize'
import { Model, DataTypes } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: ulid.attr({
        primaryKey: true,
    }),
    freezerId: ulid.attr({
        allowNull: false,
    }),
    freezerStatusTypeId: ulid.attr({
        allowNull: false,
    }),
    accountId: ulid.attr({
        allowNull: true,
        defaultValue: null,
    }),
    description: {
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
FreezerStatus.sync()

export default FreezerStatus
