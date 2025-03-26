const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Gift } = require('../models');

const GiftController = {
	async index(req, res, next) {
		try {
			const gifts = await Gift.findAll({
				include: 'user',
			});
			return res.json(new ApiResponse('Gifts retrieved successfully', gifts));
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const gift = await Gift.create({
				...req.body,
				user_id: req.user.id,
			});

			return res.json(new ApiResponse('Gift created successfully', gift));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const gift = await Gift.findOne({
				where: { id },
				include: 'user',
			});

			if (!gift) throw new ApiError(404, 'Gift not found');
			return res.json(new ApiResponse('Gift retrieved successfully', gift));
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const gift = await Gift.findOne({
				where: { id },
			});

			if (!gift) throw new ApiError(404, 'Gift not found');

			gift.title = req.body.title || gift.title;
			gift.genre = req.body.genre || gift.genre;
			gift.amount = req.body.amount || gift.amount;
			gift.address = req.body.address || gift.address;
			gift.status = req.body.status || gift.status;
			gift.latitude = req.body.latitude || gift.latitude;
			gift.longitude = req.body.longitude || gift.longitude;

			await gift.save();
			return res.json(new ApiResponse('Gift updated successfully', gift));
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const gift = await Gift.findOne({
				where: { id },
			});

			if (!gift) throw new ApiError(404, 'Gift not found');

			await gift.destroy();
			return res.json(new ApiResponse('Gift deleted successfully', gift));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = GiftController;
