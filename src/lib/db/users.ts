import sequelize from './sequelize'
import { DataTypes } from 'sequelize'

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        role: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        companyCode: {
            field: 'company_code',
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        tableName: 'user',
        timestamps: true,
    },
)

export default User
