import FreezerStatusType from './FreezerStatusType'
import FreezerType from './FreezerType'
import UserRole from './UserRole'
import User from './User'
import sequelize from './sequelize'

const models = {
    FreezerType,
    UserRole,
    User,
    FreezerStatusType,
}

export { sequelize }
export default models
