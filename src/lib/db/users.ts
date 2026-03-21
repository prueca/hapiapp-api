import { sequelize } from '.'
import { DataTypes } from 'sequelize'

const User = sequelize.define('Users', {
    role: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
})

export default User
