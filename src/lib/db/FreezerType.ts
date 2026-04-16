import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: {
        ...ulid.attr(),
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'freezer_type',
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            unique: true,
            fields: ['brand', 'type', 'year', 'capacity'],
        },
    ],
}

class FreezerType extends Model {}

FreezerType.init(attributes, options)
FreezerType.sync()

export default FreezerType
