import sequelize from './sequelize'
import { DataTypes } from 'sequelize'

const Account = sequelize.define(
    'account',
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isrCode: {
            type: DataTypes.STRING,
        },
        sapCode: {
            type: DataTypes.STRING,
        },
        companyCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountTypeId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: 'account',
        timestamps: true,
    },
)

export default Account
