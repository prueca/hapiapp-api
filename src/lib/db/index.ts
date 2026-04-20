import FreezerStatusType from './FreezerStatusType'
import FreezerType from './FreezerType'
import Freezer from './Freezer'
import UserRole from './UserRole'
import User from './User'
import sequelize from './sequelize'

const models = {
    FreezerType,
    FreezerStatusType,
    Freezer,
    UserRole,
    User,
}

export { sequelize }
export default models
