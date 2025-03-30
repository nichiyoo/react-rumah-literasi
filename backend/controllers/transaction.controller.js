const moment = require('moment');

const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');
const { Transaction, TransactionItem, Book, sequelize } = require('../models');

const TransactionController = {
	async index(req, res, next) {
		try {
			const transactions = await Transaction.findAll({
				include: ['user', 'transaction_items'],
			});

			return res.json(
				new ApiResponse('Transactions retrieved successfully', transactions)
			);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const { books, ...rest } = req.body;
			if (books.length === 0) throw new ApiError(400, 'Books are required');

			const duration = 14;
			const borrowed_date = moment(rest.borrowed_date).format('YYYY-MM-DD');
			const deadline_date = moment(borrowed_date)
				.add(duration, 'days')
				.format('YYYY-MM-DD');

			const transaction = await Transaction.create(
				{
					...rest,
					borrowed_date,
					deadline_date,
					user_id: req.user.id,
					transaction_items: books.map((book) => ({
						book_id: book.id,
						amount: book.amount,
					})),
				},
				{
					include: ['transaction_items'],
				}
			);

			return res.json(new ApiResponse('Books added successfully', transaction));
		} catch (error) {
			next(error);
		}
	},

	async status(req, res, next) {
		try {
			const uuid = req.params.uuid;
			if (!uuid) throw new ApiError(400, 'UUID is required');

			const status = req.body.status;
			if (!status) throw new ApiError(400, 'Status is required');

			const transaction = await Transaction.findOne({
				where: { uuid },
				include: [
					'user',
					{
						model: TransactionItem,
						as: 'transaction_items',
						include: ['book'],
					},
				],
			});

			if (!transaction) throw new ApiError(404, 'Transaction not found');
			await transaction.update({ status });
			await transaction.save();

			const message = 'Transaction ' + status + ' successfully';
			return res.json(new ApiResponse(message, transaction));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const uuid = req.params.uuid;
			if (!uuid) throw new ApiError(400, 'UUID is required');

			const transaction = await Transaction.findOne({
				where: { uuid },
				include: [
					'user',
					{
						model: TransactionItem,
						as: 'transaction_items',
						include: ['book'],
					},
				],
			});

			if (!transaction) throw new ApiError(404, 'Transaction not found');
			return res.json(
				new ApiResponse('Transaction retrieved successfully', transaction)
			);
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const uuid = req.params.uuid;
			if (!uuid) throw new ApiError(400, 'UUID is required');

			const transaction = await Transaction.findOne({
				where: { uuid },
			});

			if (!transaction) throw new ApiError(404, 'Transaction not found');
			await transaction.update(req.body);
			await transaction.save();

			return res.json(
				new ApiResponse('Transaction updated successfully', transaction)
			);
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const uuid = req.params.uuid;
			if (!uuid) throw new ApiError(400, 'UUID is required');

			const transaction = await Transaction.findOne({
				where: { uuid },
			});

			if (!transaction) throw new ApiError(404, 'Transaction not found');

			await transaction.destroy();
			return res.json(
				new ApiResponse('Transaction deleted successfully', transaction)
			);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = TransactionController;
