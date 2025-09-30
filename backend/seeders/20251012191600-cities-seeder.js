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
		const cities = require('../data/cities.json');

		const citiesWithTimestamps = cities.map((city) => ({
			...city,
			name: capitalize(city.name),
			created_at: new Date(),
			updated_at: new Date(),
		}));

		try {
			await queryInterface.bulkInsert('cities', citiesWithTimestamps, {});
		} catch (error) {
			console.log('Error inserting cities:', error);
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('cities', null, {});
	},
};
