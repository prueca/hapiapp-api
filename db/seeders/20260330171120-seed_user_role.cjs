'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('user_role', [
            {
                id: '39fba84d-6c5c-45b5-89c1-df45c69654d7',
                role: 'distributor-admin',
                created_at: '2026-03-26 16:57:34.486 +00:00',
                updated_at: '2026-03-26 17:01:34.486 +00:00',
            },
            {
                id: '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78',
                role: 'distributor-user',
                created_at: '2026-03-26 16:58:34.486 +00:00',
                updated_at: '2026-03-26 17:02:34.486 +00:00',
            },
            {
                id: '5a6b7c8d-9e0f-4123-5467-89ab01234567',
                role: 'dealer-admin',
                created_at: '2026-03-26 16:59:34.486 +00:00',
                updated_at: '2026-03-26 17:03:34.486 +00:00',
            },
            {
                id: '6b7c8d9e-0f1a-4234-6578-9cb0d1234567',
                role: 'dealer-user',
                created_at: '2026-03-26 17:00:34.486 +00:00',
                updated_at: '2026-03-26 17:04:34.486 +00:00',
            },
            {
                id: '7c8d9e0f-1a2b-4345-7689-acb1d2234567',
                role: 'franchisee-admin',
                created_at: '2026-03-26 17:01:34.486 +00:00',
                updated_at: '2026-03-26 17:05:34.486 +00:00',
            },
            {
                id: '8d9e0f1a-2b3c-4456-879a-bd22e3345667',
                role: 'franchisee-user',
                created_at: '2026-03-26 17:02:34.486 +00:00',
                updated_at: '2026-03-26 17:06:34.486 +00:00',
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('user_role', null, {});
         */
        await queryInterface.bulkDelete('user_role', null, [])
    },
}