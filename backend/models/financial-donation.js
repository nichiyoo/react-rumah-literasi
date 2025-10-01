'use strict';
const { Model } = require('sequelize');
const { scope } = require('../middleware/authorize');

module.exports = (sequelize, DataTypes) => {
	class FinancialDonation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'user',
			});
		}
	}
	FinancialDonation.init(
		{
			uuid: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: DataTypes.UUIDV4,
				validate: {
					notEmpty: true,
				},
			},
			amount: {
				allowNull: false,
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: true,
				},
			},
			status: {
				allowNull: false,
				type: DataTypes.ENUM,
				values: ['pending', 'success', 'failed'],
				defaultValue: 'pending',
				validate: {
					notEmpty: true,
				},
			},
			notes: {
				allowNull: true,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			payment_url: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			user_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: 'FinancialDonation',
			tableName: 'financial_donations',
			underscored: true,
			scopes: scope,
		}
	);
	return FinancialDonation;
};
