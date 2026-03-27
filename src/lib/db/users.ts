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
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: 'user',
        timestamps: true,
    },
)

export default User
