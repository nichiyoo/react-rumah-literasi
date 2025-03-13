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
			this.hasMany(models.Event, { foreignKey: 'userId' });
		}

		toJSON() {
			return { ...this.get(), id: undefined, password: undefined };
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
				type: DataTypes.STRING,
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
		}
	);
	return User;
};
