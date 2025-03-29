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
			const { books: borrows = [], ...rest } = req.body;
			if (borrows.length === 0) throw new ApiError(400, 'Books are required');

			const total = borrows.reduce((acc, book) => acc + book.amount, 0);
			if (total > 10) throw new ApiError(400, 'Maximum 10 books are allowed');

			const result = await sequelize.transaction(async (tx) => {
				const books = await Book.findAll(
					{
						where: {
							id: borrows.map((book) => book.id),
						},
					},
					{ transaction: tx }
				);

				const available = books.length === borrows.length;
				if (!available) throw new ApiError(400, 'Some books are not found');

				const valid = books.every((book) => {
					const requested = borrows.find((item) => Number(item.id) === book.id);
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
						transaction_items: borrows.map((book) => ({
							book_id: book.id,
							amount: book.amount,
						})),
					},
					{
						transaction: tx,
						include: ['transaction_items'],
					}
				);

				books.forEach((book) => {
					const requested = borrows.find((item) => Number(item.id) === book.id);
					book.update({
						amount: book.amount - requested.amount,
					});
					book.save();
				});

				return created;
			});

			return res.json(new ApiResponse('Books added successfully', result));
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

			const result = await sequelize.transaction(async (tx) => {
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
					transaction: tx,
				});

				if (!transaction) throw new ApiError(404, 'Transaction not found');

				await transaction.update({ status }, { transaction: tx });
				await transaction.save();

				if (['rejected', 'completed'].includes(status)) {
					transaction.transaction_items.forEach(async ({ book, amount }) => {
						book.update({
							amount: book.amount + amount,
						});
						book.save();
					});
				}

				return transaction;
			});

			const message = 'Transaction ' + status + ' successfully';
			return res.json(new ApiResponse(message, result));
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
