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
                first_name: 'Wile',
                middle_name: 'E',
                last_name: 'Coyote',
                username: 'coyote',
                password: 'b466074b-1634-4d9d-868f-eb28c88df0a1',
                role: 'b466074b-1634-4d9d-868f-eb28c88df0a1',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78',
                first_name: 'Road',
                middle_name: 'R',
                last_name: 'Runner',
                username: 'roadrunner',
                password: 'c8e3f9b1-d5a2-4b3c-8d4e-f7a6b5c4d3e2',
                role: 'c8e3f9b1-d5a2-4b3c-8d4e-f7a6b5c4d3e2',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '5a6b7c8d-9e0f-4123-5467-89ab01234567',
                first_name: 'Bugs',
                middle_name: 'B',
                last_name: 'Bunny',
                username: 'bugs',
                password: 'd4b9a2c8-e7f3-4d56-9a1b-3c8d7e6f5a4b',
                role: 'd4b9a2c8-e7f3-4d56-9a1b-3c8d7e6f5a4b',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '6b7c8d9e-0f1a-4234-6578-9cb0d1234567',
                first_name: 'Daffy',
                middle_name: 'D',
                last_name: 'Duck',
                username: 'daffy',
                password: 'e1c3d5b6-f8g9-4e0f-1d2e-4a5b6c7d8e9f',
                role: 'e1c3d5b6-f8g9-4e0f-1d2e-4a5b6c7d8e9f',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '7c8d9e0f-1a2b-4345-7689-acb1d2234567',
                first_name: 'Wile',
                middle_name: 'E',
                last_name: 'Coyote',
                username: 'wile',
                password: 'f9d7e8c4-g0h1-4i5j-2k3l-5m6n7o8p9q0r',
                role: 'f9d7e8c4-g0h1-4i5j-2k3l-5m6n7o8p9q0r',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '8d9e0f1a-2b3c-4456-879a-bd22e3345667',
                first_name: 'Elmer',
                middle_name: 'J',
                last_name: 'Fudd',
                username: 'elmer',
                password: 'g3e2f7d6-h5i6-4j6k-3l4m-6n7o8p9q0r1s',
                role: 'g3e2f7d6-h5i6-4j6k-3l4m-6n7o8p9q0r1s',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '9e0f1a2b-3c4d-4567-98ab-ce33f4456777',
                first_name: 'Pep',
                middle_name: 'E',
                last_name: 'Le Pew',
                username: 'pepe',
                password: 'h4f3g8e7-i9j0-4k7l-4m5n-7o8p9q0r1s2t',
                role: 'h4f3g8e7-i9j0-4k7l-4m5n-7o8p9q0r1s2t',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '0f1a2b3c-4d5e-4678-0fba-df44g5567888',
                first_name: 'Tweety',
                middle_name: 'L',
                last_name: 'Bird',
                username: 'tweety',
                password: 'i5g4h9f8-j0k1-4l8m-5n6o-8p9q0r1s2t3u',
                role: 'i5g4h9f8-j0k1-4l8m-5n6o-8p9q0r1s2t3u',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '1a2b3c4d-5e6f-4789-10cc-ef55h6678999',
                first_name: 'Sylvester',
                middle_name: 'J',
                last_name: 'Cat',
                username: 'sylvester',
                password: 'j6h5i0f9-k1l2-4m9n-6o7p-9q0r1s2t3u4v',
                role: 'j6h5i0f9-k1l2-4m9n-6o7p-9q0r1s2t3u4v',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '2b3c4d5e-6f70-4890-21dd-f066i777800a',
                first_name: 'Granny',
                middle_name: 'G',
                last_name: 'Goose',
                username: 'granny',
                password: 'k7i6j1g0-l2m3-4n0o-7p8q-0r1s2t3u4v5w',
                role: 'k7i6j1g0-l2m3-4n0o-7p8q-0r1s2t3u4v5w',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '3c4d5e6f-7081-49a1-32ee-0177j888911b',
                first_name: 'Yoink',
                middle_name: 'Y',
                last_name: 'Duckling',
                username: 'yoink',
                password: 'l8j7k2h1-m3n4-4o1p-8q9r-1s2t3u4v5w6x',
                role: 'l8j7k2h1-m3n4-4o1p-8q9r-1s2t3u4v5w6x',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '4d5e6f70-8192-4ab2-43ff-1288k999022c',
                first_name: 'Hattie',
                middle_name: 'H',
                last_name: 'Hennessy',
                username: 'hennessy',
                password: 'm9k8l3i2-n4o5-4p2q-9r0s-2t3u4v5w6x7y',
                role: 'm9k8l3i2-n4o5-4p2q-9r0s-2t3u4v5w6x7y',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ])
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
