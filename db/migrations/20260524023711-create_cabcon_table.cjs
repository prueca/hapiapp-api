'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cabcon', {
            id: {
                type: Sequelize.STRING(26),
                primaryKey: true,
                defaultValue: () => ulid(),
                validate: {
                    isULID(value) {
                        if (!/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)) {
                            throw new Error('Invalid ULID')
                        }
                    },
                },
            },
            cabcon_code_id: {
                type: Sequelize.STRING(26),
                allowNull: false,
                defaultValue: null,
                validate: {
                    isULID(value) {
                        if (
                            value &&
                            !/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)
                        ) {
                            throw new Error('Invalid ULID')
                        }
                    },
                },
            },
            account_id: {
                type: Sequelize.STRING(26),
                allowNull: false,
                defaultValue: null,
                validate: {
                    isULID(value) {
                        if (
                            value &&
                            !/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)
                        ) {
                            throw new Error('Invalid ULID')
                        }
                    },
                },
            },
            freezer_id: {
                type: Sequelize.STRING(26),
                allowNull: false,
                defaultValue: null,
                validate: {
                    isULID(value) {
                        if (
                            value &&
                            !/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)
                        ) {
                            throw new Error('Invalid ULID')
                        }
                    },
                },
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
        await queryInterface.dropTable('cabcon')
    },
}
