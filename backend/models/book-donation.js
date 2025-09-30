'use strict';
const { Model } = require('sequelize');
const { scope } = require('../middleware/authorize');

module.exports = (sequelize, DataTypes) => {
	class BookDonation extends Model {
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
	BookDonation.init(
		{
			title: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			genre: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			amount: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			address: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			status: {
				allowNull: false,
				type: DataTypes.ENUM,
				values: ['pending', 'ongoing', 'approved', 'rejected'],
				defaultValue: 'pending',
				validate: {
					notEmpty: true,
				},
			},
			latitude: {
				allowNull: false,
				type: DataTypes.FLOAT,
				validate: {
					notEmpty: true,
				},
			},
			longitude: {
				allowNull: false,
				type: DataTypes.FLOAT,
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
			modelName: 'BookDonation',
			tableName: 'book_donations',
			underscored: true,
			scopes: scope,
		}
	);
	return BookDonation;
};
