'use strict';

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

		try {
			await queryInterface.bulkInsert(
				'events',
				[
					{
						title: 'Book Donation Event',
						description:
							'In support of the worldwide book donation movement, we are organizing a book donation event to raise funds for the World Book Day Foundation.',
						date: new Date().toISOString().split('T')[0],
						user_id: 1,
						created_at: new Date(),
						updated_at: new Date(),
					},
				],
				{}
			);
		} catch (error) {
			console.log(error);
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
