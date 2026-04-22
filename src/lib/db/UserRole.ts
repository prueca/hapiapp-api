import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: ulid.attr({
        primaryKey: true,
    }),
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'user_role',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['role'],
        },
    ],
}

class UserRole extends Model {}

UserRole.init(attributes, options)
UserRole.sync()

export default UserRole
