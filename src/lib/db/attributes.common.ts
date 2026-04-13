import { ulid } from '../util'
import { DataTypes } from 'sequelize'

const id = {
    type: DataTypes.STRING(26),
    allowNull: false,
    defaultValue: ulid.generate,
    validate: {
        isULID(value: string) {
            if (!ulid.isValid(value)) {
                throw new Error('Invalid Id')
            }
        },
    },
}

export default { id }
