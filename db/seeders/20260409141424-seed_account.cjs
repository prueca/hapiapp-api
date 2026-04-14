'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('account', [
            {
                id: '39fba84d-6c5c-45b5-89c1-df45c69654d7',
                name: 'Acme Corporation',
                address: '123 Main Street, New York, NY 10001',
                isr_code: 'ISRC123456',
                sap_code: 'SAP789012',
                company_code: 'CC001',
                account_type_id: '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78',
                user_id: '5a6b7c8d-9e0f-4123-5467-89ab01234567',
                created_at: '2026-03-26 16:57:34.486 +00:00',
                updated_at: '2026-03-26 17:01:34.486 +00:00',
            },
            {
                id: '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78',
                name: 'Global Industries',
                address: '456 Business Ave, Los Angeles, CA 90001',
                isr_code: 'ISRC789012',
                sap_code: 'SAP345678',
                company_code: 'CC002',
                account_type_id: '5a6b7c8d-9e0f-4123-5467-89ab01234567',
                user_id: '39fba84d-6c5c-45b5-89c1-df45c69654d7',
                created_at: '2026-03-26 16:58:34.486 +00:00',
                updated_at: '2026-03-26 17:02:34.486 +00:00',
            },
            {
                id: '5a6b7c8d-9e0f-4123-5467-89ab01234567',
                name: 'Tech Solutions Inc',
                address: '789 Innovation Blvd, San Francisco, CA 94105',
                isr_code: 'ISRC345678',
                sap_code: 'SAP901234',
                company_code: 'CC003',
                account_type_id: '39fba84d-6c5c-45b5-89c1-df45c69654d7',
                user_id: '45d1e2f7-8b9c-4d0e-8f1a-2b3c4d5e6f78',
                created_at: '2026-03-26 16:59:34.486 +00:00',
                updated_at: '2026-03-26 17:03:34.486 +00:00',
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('account', null, [])
    },
}