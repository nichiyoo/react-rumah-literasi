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

		return await biteship.post('/v1/rates/couriers', {
			origin_postal_code: address.zipcode,
			destination_latitude: merchant.latitude,
			destination_longitude: merchant.longitude,
			couriers: 'gojek,anteraja,jnt,jne,sicepat',
			items: [
				{
					name: 'Book',
					description: 'Book donation for ' + merchant.name,
					value: Number(detail.estimated_value),
					length: Number(detail.length),
					width: Number(detail.width),
					height: Number(detail.height),
					weight: Number(detail.weight),
					quantity: 1,
				},
			],
		});
	},

	async order(bookDonation) {
		const merchant = await Merchant.findOne();
		if (!merchant) throw new Error('Merchant data not found in database');

		// Book donation should have all relationships loaded (user, address, book_donation_items)
		const destinationDetails = {
			destination_contact_name: bookDonation.user.name,
			destination_contact_phone: bookDonation.user.phone || 'N/A',
			destination_address: bookDonation.address.street_address,
			destination_postal_code: bookDonation.address.zipcode,
			destination_note: 'Book donation for ' + bookDonation.user.name,
		};

		const bookDonationItems = bookDonation.book_donation_items || [];
		const items =
			bookDonationItems.length > 0
				? bookDonationItems.map((item) => ({
						name: item.title,
						quantity: item.amount,
						weight: item.weight || 200,
						value: Math.floor(bookDonation.amount / bookDonationItems.length),
				  }))
				: [
						{
							name: 'Book Donation',
							quantity: 1,
							weight: bookDonation.weight || 200,
							value: bookDonation.amount,
						},
				  ];

		const { data } = await biteship.post('/v1/orders', {
			shipper_contact_name: merchant.name,
			shipper_contact_phone: merchant.phone,
			shipper_contact_email: merchant.email,
			shipper_organization: merchant.name,
			origin_contact_name: merchant.name,
			origin_contact_phone: merchant.phone,
			origin_address: merchant.address,
			origin_postal_code: merchant.zipcode,
			...destinationDetails,
			courier_company: bookDonation.courier_company || 'jne',
			courier_type: bookDonation.courier_type || 'REG',
			delivery_type: 'now',
			items: items,
		});

		return {
			order_id: data.id,
			delivery_fee: data.price,
			delivery_eta: data.delivery.datetime,
			tracking_id: data.courier.tracking_id,
		};
	},

	async track(tracking_id) {
		const { data } = await biteship.get('/v1/trackings/' + tracking_id);
		return data;
	},

	async rates(req, res, next) {
		try {
			const { detail } = req.body;
			const { data } = await DeliveryController.calculate(detail, req.user);

			return res.send(
				new ApiResponse(
					'Couriers fetched successfully',
					data.pricing.map((pricing) => ({
						...pricing,
						id: crypto.randomUUID(),
					}))
				)
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

	async courier(detail, courier, user) {
		const { data } = await DeliveryController.calculate(detail, user);
		const { courier_code, courier_service_code } = courier;

		return data.pricing.find(
			(item) =>
				item.courier_code === courier_code &&
				item.courier_service_code === courier_service_code
		);
	},
};

module.exports = DeliveryController;
