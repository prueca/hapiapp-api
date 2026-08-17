import _ from 'lodash'
import FreezerStatusType from './FreezerStatusType'
import FreezerType from './FreezerType'
import Freezer from './Freezer'
import FreezerStatus from './FreezerStatus'
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

sequelize
    .authenticate()
    .then(() => {
        console.log('DB connection has been established successfully.')

        return sequelize.sync({
            force: process.env.DB_FORCE === '1',
        })
    })
    .catch((error: Error) => {
        console.error('Unable to connect to the database:', error)
    })

export { sequelize }
export default models
