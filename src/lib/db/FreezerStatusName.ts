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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'freezer_status_name',
    timestamps: true,
    paranoid: true,
}

class FreezerStatusName extends Model {}

FreezerStatusName.init(attributes, options)

export default FreezerStatusName
