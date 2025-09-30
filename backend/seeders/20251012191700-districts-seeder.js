'use strict';

const { capitalize } = require('../libs/util');

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
		const districts = require('../data/districts.json');

		const districtsWithTimestamps = districts.map((district) => ({
			...district,
			name: capitalize(district.name),
			created_at: new Date(),
			updated_at: new Date(),
		}));

		try {
			await queryInterface.bulkInsert('districts', districtsWithTimestamps, {});
		} catch (error) {
			console.log('Error inserting districts:', error);
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('districts', null, {});
	},
};
