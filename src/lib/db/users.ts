import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import { ulid } from '@/lib/util'

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
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountId: ulid.attr(),
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
