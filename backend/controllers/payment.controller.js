const crypto = require('crypto');

const midtrans = require('../libs/midtrans');

const { Donation } = require('../models');

const IGNORE = 204;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const PaymentController = {
	async midtrans(donation, user) {
		try {
			return await midtrans.post('/transactions', {
				transaction_details: {
					order_id: donation.uuid,
					gross_amount: donation.amount,
					customer_details: {
						email: user.email,
					},
				},
			});
		} catch (error) {
			throw new ApiError(
				error.response.status,
				error.response?.data?.message,
				error.response?.data
			);
		}
	},

	async callback(req, res, next) {
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

		const donation = await Donation.findOne({
			where: { uuid: order_id },
			include: ['user'],
		});

		if (!donation) return res.sendStatus(IGNORE);
		if (donation.amount !== Number(gross_amount)) return res.sendStatus(IGNORE);
		if (donation.status === 'success') return res.sendStatus(200);

		switch (transaction_status) {
			case 'settlement':
				donation.status = 'success';
				break;
			case 'cancel':
			case 'failure':
			case 'expire':
				donation.status = 'failed';
				break;
		}

		await donation.save();
		return res.sendStatus(200);
	},
};

module.exports = PaymentController;
