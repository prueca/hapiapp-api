import sequelize from './sequelize'
import { DataTypes } from 'sequelize'

const AccountType = sequelize.define(
    'account_type',
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        freezeTableName: true,
        tableName: 'account_type',
        timestamps: true,
    },
)

export default AccountType
