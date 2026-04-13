import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import commonAttr from './attributes.common'

const attributes = {
    id: {
        ...commonAttr.id,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'freezer_status_name',
    timestamps: true,
    paranoid: true,
}

class FreezerStatusName extends Model {}

FreezerStatusName.init(attributes, options)

export default FreezerStatusName
