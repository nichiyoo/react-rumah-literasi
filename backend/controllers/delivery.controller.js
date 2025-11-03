const crypto = require('crypto');

const biteship = require('../libs/biteship');
const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');
const { Merchant } = require('../models');

const DeliveryController = {
	async calculate(recipient, books) {
		const merchant = await Merchant.findOne();
		if (!merchant) throw new Error('Merchant data not found in database');

		const { data } = await biteship.post('/v1/rates/couriers', {
			origin_area_id: merchant.area_id,
			destination_latitude: recipient.latitude,
			destination_longitude: recipient.longitude,
			couriers: 'gojek,anteraja,jnt,jne,sicepat',
			items: books.map((book) => ({
				name: book.book.title,
				quantity: book.amount,
				weight: 200,
				value: 50000,
			})),
		});

		return {
			destination: data.destination,
			pricings: data.pricing,
		};
	},

	async order(transaction) {
		const merchant = await Merchant.findOne();
		if (!merchant) throw new Error('Merchant data not found in database');

		const { data } = await biteship.post('/v1/orders', {
			shipper_contact_name: merchant.name,
			shipper_contact_phone: merchant.phone,
			shipper_contact_email: merchant.email,
			shipper_organization: merchant.name,
			origin_contact_name: merchant.name,
			origin_contact_phone: merchant.phone,
			origin_address: merchant.address,
			origin_postal_code: merchant.zipcode,
			destination_contact_name: transaction.name,
			destination_contact_phone: transaction.phone,
			destination_address: transaction.address,
			destination_postal_code: transaction.zipcode,
			destination_note: transaction.note,
			courier_company: transaction.courier_company,
			courier_type: transaction.courier_type,
			delivery_type: 'now',
			items: transaction.transaction_items.map((item) => ({
				name: item.book.title,
				quantity: item.amount,
				weight: 200,
				value: 50000,
			})),
		});

		return {
			delivery_fee: data.price,
			delivery_eta: data.delivery.datetime,
			tracking_id: data.courier.tracking_id,
		};
	},

	async track(tracking_id) {
		const { data } = await biteship.get('/v1/trackings/' + tracking_id);
		return data;
	},

	async couriers(req, res, next) {
		try {
			const { recipient, books } = req.body;

			const { destination, pricings } = await DeliveryController.calculate(
				recipient,
				books
			);

			return res.send(
				new ApiResponse('Couriers fetched successfully', {
					destination,
					pricings: pricings.map((pricing) => ({
						...pricing,
						id: crypto.randomUUID(),
					})),
				})
			);
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

module.exports = DeliveryController;
