import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'

const attributes = {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    capacity_unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'freezer_model',
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            unique: true,
            fields: ['brand', 'type', 'year'],
        },
    ],
}

class FreezerModel extends Model {}

FreezerModel.init(attributes, options)

export default FreezerModel
