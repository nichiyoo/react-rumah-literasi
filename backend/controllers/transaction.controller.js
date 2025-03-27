const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Transaction } = require('../models');
const PaymentController = require('./payment.controller');

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
			const transaction = await Transaction.create({
				...req.body,
				user_id: req.user.id,
			});

			return res.json(
				new ApiResponse('Transaction created successfully', transaction)
			);
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
				include: ['user', 'transaction_items'],
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
