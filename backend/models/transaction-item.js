'use strict';
const { Model } = require('sequelize');
const ApiError = require('../libs/error');

module.exports = (sequelize, DataTypes) => {
	class TransactionItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Transaction, {
				foreignKey: 'transaction_id',
				as: 'transaction',
			});

			this.belongsTo(models.Book, {
				foreignKey: 'book_id',
				as: 'book',
			});
		}
	}
	TransactionItem.init(
		{
			book_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
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
			transaction_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: 'TransactionItem',
			tableName: 'transaction_items',
			underscored: true,
		}
	);

	return TransactionItem;
};
