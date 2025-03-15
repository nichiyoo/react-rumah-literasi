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
				'books',
				[
					{
						title: 'The Great Gatsby',
						author: 'F. Scott Fitzgerald',
						publisher: 'Penguin Books',
						year: 1925,
						language: 'English',
						amount: 10,
						cover:
							'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/The_Great_Gatsby_cover_1925_wikisource.jpg/640px-The_Great_Gatsby_cover_1925_wikisource.jpg',
						created_at: new Date(),
						updated_at: new Date(),
					},
					{
						title: 'The Catcher in the Rye',
						author: 'J. D. Salinger',
						publisher: 'Penguin Books',
						year: 1951,
						language: 'English',
						amount: 10,
						cover:
							'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Catcher-in-the-rye-red-cover.jpg/640px-Catcher-in-the-rye-red-cover.jpg',
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
