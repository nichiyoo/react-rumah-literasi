'use strict';
const { Model } = require('sequelize');
const argon2 = require('argon2');
const { ROLES } = require('../libs/constant');

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

			this.hasMany(models.Transaction, {
				foreignKey: 'user_id',
				as: 'transactions',
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
				values: [ROLES.GUEST, ROLES.LIBRARIAN, ROLES.ADMIN, ROLES.SUPERADMIN],
				defaultValue: ROLES.GUEST,
				validate: {
					notEmpty: true,
				},
			},
			is_verified: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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
			hooks: {
				beforeCreate: async (user) => {
					user.password = await argon2.hash(user.password);
				},
				beforeUpdate: async (user) => {
					if (user.changed('password')) {
						user.password = await argon2.hash(user.password);
					}
				},
			},
		}
	);
	return User;
};
