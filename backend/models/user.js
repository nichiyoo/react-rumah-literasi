'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Donation, {
				foreignKey: 'user_id',
				as: 'donations',
			});

			this.hasMany(models.Gift, {
				foreignKey: 'user_id',
				as: 'gifts',
			});
		}
	}
	User.init(
		{
			uuid: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: DataTypes.UUIDV4,
				validate: {
					notEmpty: true,
				},
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
					len: [3, 100],
				},
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
					isEmail: true,
				},
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			role: {
				allowNull: false,
				type: DataTypes.ENUM,
				values: ['student', 'admin', 'librarian'],
				defaultValue: 'student',
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users',
			underscored: true,
			defaultScope: {
				attributes: {
					exclude: ['password'],
				},
			},
			scopes: {
				authentication: {
					attributes: {},
				},
			},
		}
	);
	return User;
};
