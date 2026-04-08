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
        await queryInterface.bulkInsert('account_type', [
            {
                id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
                account: 'distributor',
                created_at: '2026-04-08 13:51:08.000 +00:00',
                updated_at: '2026-04-08 13:51:08.000 +00:00',
            },
            {
                id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
                account: 'dealer',
                created_at: '2026-04-08 13:52:08.000 +00:00',
                updated_at: '2026-04-08 13:52:08.000 +00:00',
            },
            {
                id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
                account: 'franchisee',
                created_at: '2026-04-08 13:53:08.000 +00:00',
                updated_at: '2026-04-08 13:53:08.000 +00:00',
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('account_type', null, {});
         */
        await queryInterface.bulkDelete('account_type', null, [])
    },
}
