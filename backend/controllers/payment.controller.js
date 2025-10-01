const crypto = require('crypto');

const midtrans = require('../libs/midtrans');
const ApiError = require('../libs/error');

const { Donation } = require('../models');

const IGNORE = 204;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const ACTIVATE_PAYMENT = process.env.ACTIVATE_PAYMENT == 'true';

const PaymentController = {
	async midtrans(financialDonation, user) {
		if (ACTIVATE_PAYMENT) {
			return await midtrans.post('/transactions', {
				transaction_details: {
					order_id: financialDonation.uuid,
					gross_amount: financialDonation.amount,
					customer_details: {
						email: user.email,
					},
				},
			});
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
			const {
				order_id,
				signature_key,
				status_code,
				gross_amount,
				transaction_status,
			} = req.body;

			const calculated_signature = crypto
				.createHash('sha512')
				.update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
				.digest('hex');
			if (calculated_signature !== signature_key) return res.sendStatus(IGNORE);

			const statuses = ['settlement', 'cancel', 'failure', 'expire'];
			if (!statuses.includes(transaction_status)) return res.sendStatus(IGNORE);

			const financialDonation = await FinancialDonation.findOne({
				where: { uuid: order_id },
				include: ['user'],
			});

			if (!financialDonation) return res.sendStatus(IGNORE);
			if (financialDonation.amount !== Number(gross_amount)) {
				return res.sendStatus(IGNORE);
			}

			if (financialDonation.status === 'success') return res.sendStatus(200);

			switch (transaction_status) {
				case 'settlement':
					financialDonation.status = 'success';
					break;
				case 'cancel':
				case 'failure':
				case 'expire':
					financialDonation.status = 'failed';
					break;
			}

			await financialDonation.save();
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
