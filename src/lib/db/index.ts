import FreezerType from './FreezerType'
import UserRole from './UserRole'
import User from './User'
import sequelize from './sequelize'

const models = {
    FreezerType,
    UserRole,
    User,
}

export { sequelize }
export default models
