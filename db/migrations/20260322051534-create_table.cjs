use strict;

/**
 * @type {import('sequelize').Migration}
 */
async function up (queryInterface, Sequelize) {
	await queryInterface.createTable('test_table', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false
		}
	});
}

async function down (queryInterface, Sequelize) {
	await queryInterface.dropTable('test_table');
}

module.exports = { up, down };
