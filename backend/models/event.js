'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'userId' });
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	event.init(
		{
			title: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				},
			},
			description: {
				allowNull: false,
				type: DataTypes.TEXT,
				validate: {
					notEmpty: true,
				},
			},
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: true,
				},
			},
			date: {
				allowNull: false,
				type: DataTypes.DATEONLY,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: 'event',
		}
	);
	return event;
};
