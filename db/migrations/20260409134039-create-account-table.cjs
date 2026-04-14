'use strict'

/**
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('account', {
            id: {
                type: Sequelize.UUIDV4,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isr_code: {
                type: Sequelize.STRING,
            },
            sap_code: {
                type: Sequelize.STRING,
            },
            company_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            account_type_id: {
                type: Sequelize.UUIDV4,
                allowNull: false,
            },
            user_id: {
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
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('account')
    },
}
