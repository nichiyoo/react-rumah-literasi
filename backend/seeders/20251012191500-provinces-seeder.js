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
		const provinces = require('../data/provinces.json');

		const provincesWithTimestamps = provinces.map((province) => ({
			...province,
			name: capitalize(province.name),
			created_at: new Date(),
			updated_at: new Date(),
		}));

		try {
			await queryInterface.bulkInsert('provinces', provincesWithTimestamps, {});
		} catch (error) {
			console.log('Error inserting provinces:', error);
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('provinces', null, {});
	},
};
