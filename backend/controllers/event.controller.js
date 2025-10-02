const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Event } = require('../models');

const EventController = {
	async index(req, res, next) {
		try {
			const { limit } = req.query;

			const events = await Event.findAll({
				include: ['user'],
				limit: limit ? parseInt(limit) : undefined,
			});

			return res.json(new ApiResponse('Events retrieved successfully', events));
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const event = await Event.create({
				...req.body,
				media: req.file.path,
				user_id: req.user.id,
			});

			return res.json(new ApiResponse('Event created successfully', event));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
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

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const event = await Event.findOne({
				where: { id },
			});

			if (!event) throw new ApiError(404, 'Event not found');
			await event.update({
				...req.body,
				media: req.file ? req.file.path : event.media,
			});
			await event.save();

			return res.json(new ApiResponse('Event updated successfully', event));
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const event = await Event.findOne({
				where: { id },
			});

			if (!event) throw new ApiError(404, 'Event not found');

			await event.destroy();
			return res.json(new ApiResponse('Event deleted successfully', event));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = EventController;
