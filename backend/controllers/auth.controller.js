const argon2 = require('argon2');

const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');
const OneTimePassword = require('../libs/otp');
const EmailController = require('./email.controller');

const { User } = require('../models');
const Encoder = require('../libs/encrpyt');

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
			if (!user.is_verified) {
				throw new ApiError(401, 'Please verify your email address');
			}

			const valid = await argon2.verify(user.password, password);
			if (!valid) throw new ApiError(401, 'Invalid email or password');

			const otp = OneTimePassword.generate();
			EmailController.otp(otp, user);

			req.session.otp = {
				code: otp,
				uuid: user.uuid,
			};

			return res.json(
				new ApiResponse('OTP generated successfully', req.session.id)
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

			const user = await User.create(req.body);
			const token = Encoder.encode(user.uuid);
			const url = new URL(process.env.APP_URL);
			url.pathname = '/api/auth/verify';
			url.searchParams.set('token', token);
			const href = url.toString();

			await EmailController.verify(href, user);

			return res.json(
				new ApiResponse('User registered successfully', req.session.id)
			);
		} catch (error) {
			next(error);
		}
	},

	async verify(req, res, next) {
		try {
			const { token } = req.query;
			if (!token) throw new ApiError(400, 'Token is required');

			const uuid = Encoder.decode(token);
			const user = await User.findOne({
				where: { uuid },
			});
			if (!user) throw new ApiError(404, 'User not found');
			await user.update({
				is_verified: true,
			});

			const url = new URL(process.env.APP_ORIGIN);
			url.pathname = '/auth/signin';
			const href = url.toString();

			return res.redirect(href);
		} catch (error) {
			next(error);
		}
	},

	async validate(req, res, next) {
		try {
			const { otp } = req.body;

			const user = await User.findOne({
				where: {
					uuid: req.session.otp.uuid,
				},
			});

			if (!user) throw new ApiError(404, 'User not found');
			if (!OneTimePassword.verify(otp, req.session.otp.code)) {
				throw new ApiError(401, 'One time password is invalid or expired');
			}

			req.session.userId = user.uuid;
			return res.json(new ApiResponse('User logged in successfully', user));
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
