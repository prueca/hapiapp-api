import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: String(process.env.DB),
})

sequelize.sync()

export default sequelize
