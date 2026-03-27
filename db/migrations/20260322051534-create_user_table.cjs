'use strict'

/**
 * @type {import('sequelize').Migration}
 */
async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
        id: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        middleName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.UUIDV4,
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    })
}

async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user')
}

module.exports = { up, down }
