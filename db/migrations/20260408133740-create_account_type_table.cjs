'use strict'

/**
 * @type {import('sequelize').Migration}
 */
async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_type', {
        id: {
            type: Sequelize.STRING(26),
            primaryKey: true,
            allowNull: false,
            defaultValue: () => ulid.generate(),
            validate: {
                isULID(value) {
                    if (!/^[0-9A-HJKMNP-RTUVWXY]{26}$/.test(value)) {
                        throw new Error('Invalid ULID')
                    }
                },
            },
        },
        type: {
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
    await queryInterface.dropTable('account_type')
}

module.exports = { up, down }
