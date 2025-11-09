const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { ROLES, PAYMENT_STATUS } = require('../libs/constant');
const { FinancialDonation } = require('../models');
const PaymentController = require('./payment.controller');

const FinancialDonationController = {
	async index(req, res, next) {
		try {
			const financialDonations = await FinancialDonation.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findAll({
				include: 'user',
			});

			return res.json(
				new ApiResponse(
					'Financial donations retrieved successfully',
					financialDonations
				)
			);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const financialDonation = await FinancialDonation.create({
				...req.body,
				user_id: req.user.id,
			});

			const { data } = await PaymentController.midtrans(
				financialDonation,
				req.user
			);

			await financialDonation.update({
				payment_url: data.redirect_url,
				status: PAYMENT_STATUS.PENDING
			});

			return res.json(
				new ApiResponse(
					'Financial donation created successfully',
					financialDonation
				)
			);
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const financialDonation = await FinancialDonation.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
				include: 'user',
			});

			if (!financialDonation) {
				throw new ApiError(404, 'Financial donation not found');
			}

			return res.json(
				new ApiResponse(
					'Financial donation retrieved successfully',
					financialDonation
				)
			);
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const financialDonation = await FinancialDonation.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
			});

			if (!financialDonation)
				throw new ApiError(404, 'Financial donation not found');
			await financialDonation.update(req.body);

			return res.json(
				new ApiResponse(
					'Financial donation updated successfully',
					financialDonation
				)
			);
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const financialDonation = await FinancialDonation.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
			});

			if (!financialDonation) {
				throw new ApiError(404, 'Financial donation not found');
			}

			const pending = financialDonation.status === PAYMENT_STATUS.PENDING;
			if (!pending) {
				throw new ApiError(
					400,
					'Cannot delete donation unless the status is pending'
				);
			}

			await financialDonation.destroy();
			return res.json(
				new ApiResponse(
					'Financial donation deleted successfully',
					financialDonation
				)
			);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = FinancialDonationController;
