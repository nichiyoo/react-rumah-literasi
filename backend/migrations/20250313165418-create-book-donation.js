'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('book_donations', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			title: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			genre: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			amount: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			address: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			status: {
				allowNull: false,
				type: DataTypes.ENUM,
				values: ['pending', 'ongoing', 'approved', 'rejected'],
				defaultValue: 'pending',
			},
			latitude: {
				allowNull: false,
				type: DataTypes.FLOAT,
			},
			longitude: {
				allowNull: false,
				type: DataTypes.FLOAT,
			},
			user_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			province_id: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			city_id: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			district_id: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			zipcode: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			dimension: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			weight: {
				allowNull: true,
				type: DataTypes.FLOAT,
			},
			image_url: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			created_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updated_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('book_donations');
	},
};
