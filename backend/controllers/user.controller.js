const argon2 = require('argon2');
const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { User, Event } = require('../models');

const UserController = {
	async index(req, res, next) {
		try {
			const users = await User.findAll({
				include: [
					{
						model: Event,
					},
				],
			});
			return res.json(new ApiResponse('Users retrieved successfully', users));
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const password = req.body.password;
			if (!password) throw new ApiError(400, 'Password is required');

			const hashed = await argon2.hash(req.body.password);
			const user = await User.create({
				...req.body,
				password: hashed,
			});

			return res.json(new ApiResponse('User created successfully', user));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const uuid = req.params.uuid;
			if (!uuid) throw new ApiError(400, 'UUID is required');

			const user = await User.findOne({
				where: { uuid },
			});

			if (!user) throw new ApiError(404, 'User not found');
			return res.json(new ApiResponse('User retrieved successfully', user));
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const uuid = req.params.uuid;
			if (!uuid) throw new ApiError(400, 'UUID is required');

			const user = await User.findOne({
				where: { uuid },
			});

			if (!user) throw new ApiError(404, 'User not found');

			user.name = req.body.name;
			user.email = req.body.email;
			user.password = req.body.password;
			user.role = req.body.role;

			await user.save();
			return res.json(new ApiResponse('User updated successfully', user));
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const uuid = req.params.uuid;
			if (!uuid) throw new ApiError(400, 'UUID is required');

			const user = await User.findOne({
				where: { uuid },
			});

			if (!user) throw new ApiError(404, 'User not found');

			await user.destroy();
			return res.json(new ApiResponse('User deleted successfully', user));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = UserController;
