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
        await queryInterface.bulkInsert('user', [
            {
                id: '39fba84d-6c5c-45b5-89c1-df45c69654d7',
                role: 'user',
                username: 'coyote',
                company_code: 'store-198',
                password: 'b466074b-1634-4d9d-868f-eb28c88df0a1',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78',
                role: 'user',
                username: 'roadrunner',
                company_code: 'store-199',
                password: 'c8e3f9b1-d5a2-4b3c-8d4e-f7a6b5c4d3e2',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '5a6b7c8d-9e0f-4123-5467-89ab01234567',
                role: 'user',
                username: 'bugs',
                company_code: 'store-200',
                password: 'd4b9a2c8-e7f3-4d56-9a1b-3c8d7e6f5a4b',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '6b7c8d9e-0f1a-4234-6578-9cb0d1234567',
                role: 'user',
                username: 'daffy',
                company_code: 'store-201',
                password: 'e1c3d5b6-f8g9-4e0f-1d2e-4a5b6c7d8e9f',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '7c8d9e0f-1a2b-4345-7689-acb1d2234567',
                role: 'user',
                username: 'wile',
                company_code: 'store-202',
                password: 'f9d7e8c4-g0h1-4i5j-2k3l-5m6n7o8p9q0r',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '8d9e0f1a-2b3c-4456-879a-bd22e3345667',
                role: 'user',
                username: 'elmer',
                company_code: 'store-203',
                password: 'g3e2f7d6-h5i6-4j6k-3l4m-6n7o8p9q0r1s',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '9e0f1a2b-3c4d-4567-98ab-ce33f4456777',
                role: 'user',
                username: 'pepe',
                company_code: 'store-204',
                password: 'h4f3g8e7-i9j0-4k7l-4m5n-7o8p9q0r1s2t',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '0f1a2b3c-4d5e-4678-0fba-df44g5567888',
                role: 'user',
                username: 'tweety',
                company_code: 'store-205',
                password: 'i5g4h9f8-j0k1-4l8m-5n6o-8p9q0r1s2t3u',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '1a2b3c4d-5e6f-4789-10cc-ef55h6678999',
                role: 'user',
                username: 'sylvester',
                company_code: 'store-206',
                password: 'j6h5i0f9-k1l2-4m9n-6o7p-9q0r1s2t3u4v',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '2b3c4d5e-6f70-4890-21dd-f066i777800a',
                role: 'user',
                username: 'granny',
                company_code: 'store-207',
                password: 'k7i6j1g0-l2m3-4n0o-7p8q-0r1s2t3u4v5w',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '3c4d5e6f-7081-49a1-32ee-0177j888911b',
                role: 'user',
                username: 'yoink',
                company_code: 'store-208',
                password: 'l8j7k2h1-m3n4-4o1p-8q9r-1s2t3u4v5w6x',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '4d5e6f70-8192-4ab2-43ff-1288k999022c',
                role: 'user',
                username: 'hennessy',
                company_code: 'store-209',
                password: 'm9k8l3i2-n4o5-4p2q-9r0s-2t3u4v5w6x7y',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('user', null, {});
         */
        await queryInterface.bulkDelete('user', null, [])
    },
}
