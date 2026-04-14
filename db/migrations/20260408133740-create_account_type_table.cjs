'use strict'

/**
 * @type {import('sequelize').Migration}
 */
async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_type', {
        id: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        account: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
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
    await queryInterface.dropTable('account_type')
}

module.exports = { up, down }