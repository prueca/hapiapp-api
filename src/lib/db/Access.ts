import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: {
        type: DataTypes.STRING(26),
        primaryKey: true,
        defaultValue: ulid.generate,
        validate: {
            isValid: ulid.validator(),
        },
    },
    userId: {
        type: DataTypes.STRING(26),
        allowNull: true,
        defaultValue: null,
        validate: {
            isValid: ulid.validator(true),
        },
    },
    accountId: {
        type: DataTypes.STRING(26),
        allowNull: true,
        defaultValue: null,
        validate: {
            isValid: ulid.validator(true),
        },
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'access',
    timestamps: true,
}

class Access extends Model {
    declare id: string
    declare userId: string
    declare accountId: string
}

Access.init(attributes, options)

export default Access
