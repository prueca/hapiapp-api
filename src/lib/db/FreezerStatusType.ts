import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: {
        ...ulid.attr(),
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'freezer_status_type',
    timestamps: true,
    paranoid: true,
}

class FreezerStatusType extends Model {}

FreezerStatusType.init(attributes, options)
FreezerStatusType.sync()

export default FreezerStatusType
