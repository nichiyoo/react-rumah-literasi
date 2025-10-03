const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Event } = require('../models');

const PublicController = {
	async events(req, res, next) {
		try {
			const { limit } = req.query;

			const events = await Event.findAll({
				include: ['user'],
				limit: req.query.limit ? parseInt(limit) : undefined,
			});

			return res.json(new ApiResponse('Events retrieved successfully', events));
		} catch (error) {
			next(error);
		}
	},

	async event(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const event = await Event.findOne({
				where: { id },
				include: ['user'],
			});

			if (!event) throw new ApiError(404, 'Event not found');
			return res.json(new ApiResponse('Event retrieved successfully', event));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = PublicController;
