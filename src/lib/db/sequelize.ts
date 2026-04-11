import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: String(process.env.DB),
    define: {
        underscored: true,
    },
    logging: false,
})

export default sequelize
