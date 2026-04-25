import AccountType from './AccountType'
import FreezerStatusType from './FreezerStatusType'
import FreezerType from './FreezerType'
import Freezer from './Freezer'
import FreezerStatus from './FreezerStatus'
import UserRole from './UserRole'
import User from './User'
import sequelize from './sequelize'
import Account from './Account'

const models = {
    Account,
    AccountType,
    FreezerStatusType,
    FreezerType,
    FreezerStatus,
    Freezer,
    UserRole,
    User,
}

export { sequelize }
export default models
