'use strict'

/**
 * @type {import('sequelize').Migration}
 */
async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_role', {
        id: {
            type: Sequelize.STRING(26),
            primaryKey: true,
            allowNull: false,
            defaulValue: () => ulid(),
            validate: {
                isULID(value) {
                    if (!/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)) {
                        throw new Error('Invalid ULID')
                    }
                },
            },
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
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
    await queryInterface.dropTable('user_role')
}

module.exports = { up, down }
