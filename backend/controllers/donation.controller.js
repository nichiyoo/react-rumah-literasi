const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Donation } = require('../models');

const DonationController = {
	async index(req, res, next) {
		try {
			const events = await Donation.findAll({
				include: 'user',
			});
			return res.json(
				new ApiResponse('Donations retrieved successfully', events)
			);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const event = await Donation.create(req.body);
			return res.json(new ApiResponse('Donation created successfully', event));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const event = await Donation.findOne({
				where: { id },
				include: 'user',
			});

			if (!event) throw new ApiError(404, 'Donation not found');
			return res.json(
				new ApiResponse('Donation retrieved successfully', event)
			);
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const event = await Donation.findOne({
				where: { id },
			});

			if (!event) throw new ApiError(404, 'Donation not found');

			event.account = req.body.account || event.account;
			event.receipt = req.body.receipt || event.receipt;

			await event.save();
			return res.json(new ApiResponse('Donation updated successfully', event));
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const event = await Donation.findOne({
				where: { id },
			});

			if (!event) throw new ApiError(404, 'Donation not found');

			await event.destroy();
			return res.json(new ApiResponse('Donation deleted successfully', event));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = DonationController;
