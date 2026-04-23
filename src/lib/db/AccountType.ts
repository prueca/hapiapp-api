import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: ulid.attr({
        primaryKey: true,
    }),
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'account_type',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['type'],
        },
    ],
}

class AccountType extends Model {}

AccountType.init(attributes, options)
AccountType.sync()

export default AccountType
