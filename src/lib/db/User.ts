import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: {
        ...ulid.attr(),
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.STRING(26),
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
    accountId: {
        type: DataTypes.STRING(26),
        allowNull: true,
        defaultValue: ulid.generate,
        validate: {
            isULID(value: string) {
                if (!ulid.isValid(value)) {
                    throw new Error('Invalid Id')
                }
            },
        },
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'user',
    timestamps: true,
}

class User extends Model {}

User.init(attributes, options)

export default User
