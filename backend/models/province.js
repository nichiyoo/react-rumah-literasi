'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Province extends Model {
		static associate(models) {
			this.hasMany(models.City, {
				foreignKey: 'province_id',
				as: 'cities',
			});
			this.hasMany(models.BookDonation, {
				foreignKey: 'province_id',
				as: 'bookDonations',
			});
		}
	}
	Province.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			latitude: {
				type: DataTypes.DOUBLE,
				allowNull: true,
				defaultValue: 0,
			},
			longitude: {
				type: DataTypes.DOUBLE,
				allowNull: true,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: 'Province',
			tableName: 'provinces',
			underscored: true,
			timestamps: true,
		}
	);
	return Province;
};
