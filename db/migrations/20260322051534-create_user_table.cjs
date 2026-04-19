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
            defaultValue: Sequelize.literal('gen_random_uuid()::text'),
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
        role: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        account_id: {
            type: Sequelize.STRING(26),
            allowNull: false,
            defaultValue: Sequelize.literal('gen_random_uuid()::text'),
            validate: {
                isULID(value) {
                    if (!/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)) {
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
