import sequelize from './sequelize'
import { Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: ulid.attr({
        primaryKey: true,
    }),
    cabconCodeId: ulid.attr({
        allowNull: false,
    }),
    accountId: ulid.attr({
        allowNull: false,
    }),
    freezerId: ulid.attr({
        allowNull: false,
    }),
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'cabcon',
    timestamps: true,
}

class Cabcon extends Model {}

Cabcon.init(attributes, options)

export default Cabcon
