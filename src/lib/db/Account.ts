import sequelize from './sequelize'
import { DataTypes, Model } from 'sequelize'
import ulid from '@/lib/util/ulid'

const attributes = {
    id: ulid.attr({
        primaryKey: true,
    }),
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isrCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sapCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountTypeId: ulid.attr({
        allowNull: false,
    }),
    associateId: ulid.attr({
        allowNull: true,
    }),
}

const options = {
    sequelize,
    freezeTableName: true,
    tableName: 'account',
    timestamps: true,
}

class Account extends Model {
    declare id: string
    declare name: string
    declare address: string
    declare phone: string
    declare isrCode: string
    declare sapCode: string
    declare companyCode: string
    declare accountTypeId: string
    declare associateId: string
}

Account.init(attributes, options)

export default Account
