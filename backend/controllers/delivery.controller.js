const crypto = require('crypto');

const biteship = require('../libs/biteship');
const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');
const { Merchant, Address } = require('../models');

const DeliveryController = {
	async calculate(detail, user) {
		const merchant = await Merchant.findOne();
		if (!merchant) throw new ApiError(404, 'Merchant data not found');

		const address = await Address.scope({
			method: ['authorize', user],
		}).findOne({
			where: {
				id: detail.address_id,
			},
		});

		if (!address) throw new ApiError(404, 'Address data not found');
		if (!address.area_id) throw new ApiError(404, 'Address area not found');

		const { data } = await biteship.post('/v1/rates/couriers', {
			origin_postal_code: address.zipcode,
			destination_latitude: merchant.latitude,
			destination_longitude: merchant.longitude,
			couriers: 'gojek,anteraja,jnt,jne,sicepat',
			items: [
				{
					name: 'Book',
					description: 'Book donation for ' + merchant.name,
					value: Number(detail.estimated_value),
					length: Number(detail.width),
					width: Number(detail.width),
					height: Number(detail.height),
					weight: Number(detail.weight),
					quantity: 1,
				},
			],
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

		console.log(data);

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
			const { detail } = req.body;
			const { destination, pricings } = await DeliveryController.calculate(
				detail,
				req.user
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
					error.response?.status || 500,
					error.response?.data.message || error.message,
					error.response?.data
				)
			);
		}
	},
};

module.exports = DeliveryController;
