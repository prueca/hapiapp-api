'use strict'

/**
 * @type {import('sequelize').Migration}
 */
async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('account', {
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
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isr_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sap_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        company_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        account_type_id: {
            type: Sequelize.STRING(26),
            allowNull: false,
            defaultValue: null,
            validate: {
                isULID(value) {
                    if (value && !/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)) {
                        throw new Error('Invalid ULID')
                    }
                },
            },
        },
        associate_id: {
            type: Sequelize.STRING(26),
            allowNull: true,
            defaultValue: null,
            validate: {
                isULID(value) {
                    if (value && !/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)) {
                        throw new Error('Invalid ULID')
                    }
                },
            },
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
}

async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account')
}

module.exports = { up, down }
