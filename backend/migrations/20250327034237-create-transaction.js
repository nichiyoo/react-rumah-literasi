'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('transactions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: DataTypes.UUIDV4,
			},
			receipient: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			phone: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			address: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			zipcode: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			borrowed_date: {
				allowNull: false,
				type: DataTypes.DATEONLY,
			},
			deadline_date: {
				allowNull: false,
				type: DataTypes.DATEONLY,
			},
			returned_date: {
				allowNull: true,
				type: DataTypes.DATEONLY,
			},
			tracking_id: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			waybill_id: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			courier: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			delivery_fee: {
				allowNull: true,
				type: DataTypes.FLOAT,
			},
			status: {
				allowNull: false,
				type: DataTypes.ENUM,
				values: ['pending', 'approved', 'rejected', 'completed'],
				defaultValue: 'pending',
			},
			user_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
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
		await queryInterface.dropTable('transactions');
	},
};
