import _ from 'lodash'
import FreezerStatusType from './FreezerStatusType'
import FreezerType from './FreezerType'
import Freezer from './Freezer'
import FreezerStatus from './FreezerStatus'
import UserRole from './UserRole'
import User from './User'
import sequelize from './sequelize'
import Account from './Account'
import CabconCode from './CabconCode'
import Cabcon from './Cabcon'
import Access from './Access'

const models = {
    Account,
    FreezerStatusType,
    FreezerType,
    FreezerStatus,
    Freezer,
    UserRole,
    User,
    CabconCode,
    Cabcon,
    Access,
}

type ModelWithAssociate = {
    associate?: (arg: typeof models) => void
}

_.values(models).map((model) => {
    let assoc = (model as typeof model & ModelWithAssociate).associate

    if (typeof assoc !== 'function') {
        return
    }

    assoc = assoc.bind(model)
    assoc(models)
})

export { sequelize }
export default models
