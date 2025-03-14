const argon2 = require('argon2');
const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { User } = require('../models');

const AuthController = {
	async signin(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw new ApiError(400, 'Email or password is required');
			}

			const user = await User.scope('authentication').findOne({
				where: { email },
			});
			if (!user) throw new ApiError(404, 'User not found');

			const valid = await argon2.verify(user.password, password);
			if (!valid) throw new ApiError(401, 'Invalid email or password');

			req.session.userId = user.uuid;
			return res.json(
				new ApiResponse('User logged in successfully', {
					...user.dataValues,
					password: undefined,
				})
			);
		} catch (error) {
			next(error);
		}
	},

	async signup(req, res, next) {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				throw new ApiError(400, 'Name, email or password is required');
			}

			const found = await User.findOne({
				where: {
					email,
				},
			});
			if (found) throw new ApiError(400, 'Email already exists');

			const hashed = await argon2.hash(password);
			const user = await User.create({
				...req.body,
				password: hashed,
			});

			req.session.user = user;
			return res.json(new ApiResponse('User registered successfully', user));
		} catch (error) {
			next(error);
		}
	},

	async signout(req, res, next) {
		try {
			req.session.destroy();
			return res.json(new ApiResponse('User logged out successfully'));
		} catch (error) {
			next(error);
		}
	},

	async profile(req, res, next) {
		try {
			console.log(req.user);

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
