import sequelize from './sequelize'
import { DataTypes } from 'sequelize'

const UserRole = sequelize.define(
    'user_role',
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        freezeTableName: true,
        tableName: 'user_role',
        timestamps: true,
    },
)

export default UserRole
