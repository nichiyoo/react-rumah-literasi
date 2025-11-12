const crypto = require('crypto');

const midtrans = require('../libs/midtrans');
const ApiError = require('../libs/error');

const { FinancialDonation } = require('../models');
const { PAYMENT_STATUS } = require('../libs/constant');
const DeliveryController = require('./delivery.controller');

const IGNORE = 204;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const ACTIVATE_PAYMENT = process.env.ACTIVATE_PAYMENT == 'true';

const PaymentController = {
	async midtrans(donation, user, type) {
		const callback = new URL(process.env.MIDTRANS_CALLBACK_URL);
		callback.searchParams.append('type', type);

		if (ACTIVATE_PAYMENT) {
			return await midtrans.post(
				'/transactions',
				{
					transaction_details: {
						order_id: donation.uuid,
						gross_amount: donation.amount,
						customer_details: {
							email: user.email,
						},
					},
				},
				{
					headers: {
						'X-Override-Notification': callback.toString(),
					},
				}
			);
		}

		return new Promise((resolve) => {
			resolve({
				data: {
					redirect_url: 'http://example.com',
				},
			});
		});
	},

	async callback(req, res, next) {
		try {
			// Determine the type from query parameter
			const type = req.query.type || 'financial'; // default to financial for backward compatibility

			if (type === 'book') {
				return this.bookDonationCallback(req, res, next);
			} else {
				return this.financialDonationCallback(req, res, next);
			}
		} catch (error) {
			if (error instanceof ApiError) return next(error);
			return next(
				new ApiError(
					error.response.status || 500,
					error.response.data.message || error.message,
					error.response.data
				)
			);
		}
	},

	async financialDonationCallback(req, res, next) {
		try {
			const crypto = require('crypto');
			const {
				order_id,
				signature_key,
				status_code,
				gross_amount,
				transaction_status,
			} = req.body;

			const calculated = crypto
				.createHash('sha512')
				.update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
				.digest('hex');

			if (calculated !== signature_key) return res.sendStatus(204);
			const statuses = ['settlement', 'cancel', 'failure', 'expire'];
			if (!statuses.includes(transaction_status)) return res.sendStatus(204);

			const donation = await FinancialDonation.findOne({
				where: { uuid: order_id },
			});

			if (!donation) return res.sendStatus(204);

			const amount = donation.amount;
			const current = donation.status;

			if (amount !== Number(gross_amount)) return res.sendStatus(204);
			if (current === PAYMENT_STATUS.SUCCESS) return res.sendStatus(200);

			const updated = {};
			switch (transaction_status) {
				case 'settlement':
					updated.status = PAYMENT_STATUS.SUCCESS;
					break;
				case 'cancel':
				case 'failure':
				case 'expire':
					updated.status = PAYMENT_STATUS.FAILED;
					break;
			}

			await donation.update(updated);
			return res.sendStatus(200);
		} catch (error) {
			if (error instanceof ApiError) return next(error);
			return next(
				new ApiError(
					error.response.status || 500,
					error.response.data.message || error.message,
					error.response.data
				)
			);
		}
	},

	async bookDonationCallback(req, res, next) {
		try {
			const crypto = require('crypto');
			const {
				order_id,
				signature_key,
				status_code,
				gross_amount,
				transaction_status,
			} = req.body;

			const calculated = crypto
				.createHash('sha512')
				.update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
				.digest('hex');

			if (calculated !== signature_key) return res.sendStatus(204);

			const statuses = ['settlement', 'cancel', 'failure', 'expire'];
			if (!statuses.includes(transaction_status)) return res.sendStatus(204);

			const BookDonation = require('../models').BookDonation;
			const donation = await BookDonation.findOne({
				where: { uuid: order_id },
			});

			if (!donation) return res.sendStatus(204);

			const amount = donation.amount;
			const current = donation.status;

			if (amount !== Number(gross_amount)) return res.sendStatus(204);
			if (current === PAYMENT_STATUS.SUCCESS) return res.sendStatus(200);

			const updated = {};
			switch (transaction_status) {
				case 'settlement':
					updated.status = PAYMENT_STATUS.SUCCESS;
					// Create order with biteship when book donation payment is successful
					const result = await DeliveryController.order(donation);
					updated.order_id = result.order_id || result.tracking_id;
					updated.delivery_fee = result.delivery_fee;
					updated.delivery_eta = result.delivery_eta;
					updated.tracking_id = result.tracking_id;
					break;
				case 'cancel':
				case 'failure':
				case 'expire':
					updated.status = PAYMENT_STATUS.FAILED;
					break;
			}

			await donation.update(updated);
			return res.sendStatus(200);
		} catch (error) {
			if (error instanceof ApiError) return next(error);
			return next(
				new ApiError(
					error.response.status || 500,
					error.response.data.message || error.message,
					error.response.data
				)
			);
		}
	},
};

module.exports = PaymentController;
