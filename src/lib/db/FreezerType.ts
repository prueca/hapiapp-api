import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '../util/ulid'

const attributes = {
    id: {
        type: DataTypes.STRING(26),
        primaryKey: true,
        allowNull: false,
        defaultValue: ulid.generate,
        validate: {
            isULID(value: string) {
                if (!ulid.isValid(value)) {
                    throw new Error('Invalid Id')
                }
            },
        },
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

class FreezerModel extends Model {}

FreezerModel.init(attributes, options)

export default FreezerModel
