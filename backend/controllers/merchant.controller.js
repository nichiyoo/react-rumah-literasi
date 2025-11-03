const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Merchant } = require('../models');

const MerchantController = {
	async get(req, res, next) {
		try {
			const merchant = await Merchant.findOne();
			if (!merchant) throw new ApiError(404, 'Merchant not found');

			return res.json(
				new ApiResponse('Merchant retrieved successfully', merchant)
			);
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const merchant = await Merchant.findOne();
			if (!merchant) throw new ApiError(404, 'Merchant not found');

			await merchant.update(req.body);
			return res.json(
				new ApiResponse('Merchant updated successfully', merchant)
			);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = MerchantController;
