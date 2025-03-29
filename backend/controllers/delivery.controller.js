const crypto = require('crypto');

const biteship = require('../libs/biteship');
const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const DeliveryController = {
	async calculate(recipient, books) {
		const { data } = await biteship.post('/v1/rates/couriers', {
			origin_area_id: process.env.MERCHANT_AREA_ID,
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
