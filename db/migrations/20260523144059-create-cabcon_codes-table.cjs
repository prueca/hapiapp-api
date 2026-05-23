'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cabcon_code', {
            id: {
                type: Sequelize.STRING(26),
                primaryKey: true,
                allowNull: false,
                defaultValue: () => ulid(),
                validate: {
                    isULID(value) {
                        if (!/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)) {
                            throw new Error('Invalid ULID')
                        }
                    },
                },
            },
            month_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('cabcon_code')
    },
}
