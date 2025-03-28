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
			const { books = [], ...rest } = req.body;
			if (books.length === 0) throw new ApiError(400, 'Books are required');

			const total = books.reduce((acc, book) => acc + book.amount, 0);
			if (total > 10) throw new ApiError(400, 'Maximum 10 books are allowed');

			const result = await sequelize.transaction(async (tx) => {
				const founds = await Book.findAll(
					{ where: { id: books.map((book) => book.id) } },
					{ transaction: tx }
				);

				if (founds.length !== books.length) {
					throw new ApiError(400, 'Some books are not found');
				}

				const valid = founds.every((book) => {
					const requested = books.find((item) => Number(item.id) === book.id);
					return requested.amount <= book.amount;
				});

				if (!valid) throw new ApiError(400, 'Some books are not available');

				const duration = 14;
				const borrowed_date = moment(rest.borrowed_date).format('YYYY-MM-DD');
				const deadline_date = moment(borrowed_date)
					.add(duration, 'days')
					.format('YYYY-MM-DD');

				const created = await Transaction.create(
					{
						...rest,
						borrowed_date,
						deadline_date,
						user_id: req.user.id,
					},
					{ transaction: tx }
				);

				await TransactionItem.bulkCreate(
					books.map((book) => ({
						transaction_id: created.id,
						book_id: book.id,
						amount: book.amount,
					})),
					{ transaction: tx }
				);

				founds.forEach((book) => {
					const requested = books.find((item) => Number(item.id) === book.id);
					book.update({
						amount: book.amount - requested.amount,
					});
					book.save();
				});

				const transaction = await Transaction.findOne(
					{
						where: { id: created.id },
						include: ['user', 'transaction_items'],
					},
					{ transaction: tx }
				);

				return transaction;
			});

			return res.json(new ApiResponse('Books added successfully', result));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const transaction = await Transaction.findOne({
				where: { id },
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
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const transaction = await Transaction.findOne({
				where: { id },
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
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const transaction = await Transaction.findOne({
				where: { id },
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
