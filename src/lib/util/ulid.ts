import { monotonicFactory, isValid } from 'ulid'
import { DataTypes } from 'sequelize'

const ulid = monotonicFactory()
const generate = () => ulid()

const attr = ({ allowNull = false, primaryKey = false, ...options } = {}) => {
    // We use this function to define id attributes for our models.
    // This fixes the issue of id fields not being created because
    // of the same reference when we define multiple fields with
    // same object.

    return {
        type: DataTypes.STRING(26),
        allowNull: false,
        defaultValue: generate,
        validate: {
            isULID(value: string) {
                if (allowNull && value === null) {
                    return
                }
                if (!isValid(value)) {
                    throw new Error('Invalid Id')
                }
            },
        },
        ...options,
    }
}

export default {
    isValid,
    generate,
    attr,
}
