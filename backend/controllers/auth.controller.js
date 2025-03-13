const argon2 = require('argon2');
const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { User } = require('../models');

const AuthController = {
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw new ApiError(400, 'Email or password is required');
			}

			const user = await User.findOne({
				where: { email },
			});
			if (!user) throw new ApiError(404, 'User not found');

			const valid = await argon2.verify(password, user.password);
			if (!valid) throw new ApiError(401, 'Invalid email or password');

			return res.json(new ApiResponse('User logged in successfully', user));
		} catch (error) {
			next(error);
		}
	},

	async register(req, res, next) {
		try {
			const password = req.body.password;
			if (!password) throw new ApiError(400, 'Password is required');

			const found = await User.findOne({
				where: {
					email,
				},
			});
			if (found) throw new ApiError(400, 'Email already exists');

			const hashed = await argon2.hash(password);
			const user = await User.create({
				email,
				password: hashed,
			});

			return res.json(new ApiResponse('User registered successfully', user));
		} catch (error) {
			next(error);
		}
	},

	async logout(req, res, next) {
		try {
			const user = await User.findOne({
				where: { uuid: req.user.uuid },
			});

			if (!user) throw new ApiError(404, 'User not found');

			return res.json(new ApiResponse('User logged out successfully', user));
		} catch (error) {
			next(error);
		}
	},

	async profile(req, res, next) {
		try {
			const user = await User.findOne({
				where: { uuid: req.user.uuid },
			});

			if (!user) throw new ApiError(404, 'User not found');

			return res.json(new ApiResponse('Profile retrieved successfully', user));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = AuthController;
