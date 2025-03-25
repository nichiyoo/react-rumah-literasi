'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Donation extends Model {
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
	Donation.init(
		{
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
				validate: {
					notEmpty: true,
				},
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
			modelName: 'Donation',
			tableName: 'donations',
			underscored: true,
		}
	);
	return Donation;
};
