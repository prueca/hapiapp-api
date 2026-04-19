'use strict'

/**
 * @type {import('sequelize').Migration}
 */
async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
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
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        middle_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role_id: {
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
        account_id: {
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
    await queryInterface.dropTable('user')
}

module.exports = { up, down }
