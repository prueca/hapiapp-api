import AccountType from './AccountType'
import FreezerStatusType from './FreezerStatusType'
import FreezerType from './FreezerType'
import Freezer from './Freezer'
import UserRole from './UserRole'
import User from './User'
import sequelize from './sequelize'
import Account from './Account'
import CabconCode from './CabconCode'

const models = {
    Account,
    AccountType,
    FreezerType,
    FreezerStatusType,
    Freezer,
    UserRole,
    User,
    CabconCode,
}

export { sequelize }
export default models
