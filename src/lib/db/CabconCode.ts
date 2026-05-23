import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: ulid.attr({
        primaryKey: true,
    }),
    monthCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'cabcon_code',
    timestamps: true,
}

class CabconCode extends Model {}

CabconCode.init(attributes, options)

export default CabconCode
