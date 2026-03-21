// Export model here
// E.g.: export { default as Model } from './model'

import { Sequelize } from 'sequelize'
import path from 'path'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, './database.sqlite'),
})

export { default as User } from './users'
