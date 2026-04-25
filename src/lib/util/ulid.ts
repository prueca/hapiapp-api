import { monotonicFactory, isValid } from 'ulid'
import { DataTypes } from 'sequelize'

const ulid = monotonicFactory()
const generate = () => ulid()

const attr = (args?: Record<string, any>) => {
    // We use this function to define id attributes for our models.
    // This fixes the issue of id fields not being created because
    // of the same reference when we define multiple fields with
    // same object.

    // Note: We only set allowNull to true if primaryKey is false.

    const allowNull = args?.allowNull ?? true
    const primaryKey = args?.primaryKey ?? false

    return {
        type: DataTypes.STRING(26),
        primaryKey,
        allowNull: allowNull && !primaryKey,
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
        ...args,
    }
}

export default {
    isValid,
    generate,
    attr,
}
