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
			this.belongsTo(models.Province, {
				foreignKey: 'province_id',
				as: 'province',
			});
			this.belongsTo(models.City, {
				foreignKey: 'city_id',
				as: 'city',
			});
			this.belongsTo(models.District, {
				foreignKey: 'district_id',
				as: 'district',
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
			province_id: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			city_id: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			district_id: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			zipcode: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
					isNumeric: true,
					len: [5],
				},
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
