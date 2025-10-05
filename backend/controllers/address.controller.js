const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Address } = require('../models');
const { ROLES } = require('../libs/constant');

const AddressController = {
	async index(req, res, next) {
		try {
			const addresses = await Address.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findAll({
				where: { user_id: req.user.id },
				include: ['user', 'province', 'city', 'district'],
			});

			return res.json(
				new ApiResponse('Addresses retrieved successfully', addresses)
			);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const address = await Address.create({
				...req.body,
				user_id: req.user.id,
			});

			return res.json(new ApiResponse('Address created successfully', address));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const address = await Address.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
				include: ['user', 'province', 'city', 'district'],
			});

			if (!address) throw new ApiError(404, 'Address not found');
			return res.json(
				new ApiResponse('Address retrieved successfully', address)
			);
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const address = await Address.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
			});

			if (!address) throw new ApiError(404, 'Address not found');
			await address.update(req.body);
			await address.save();

			return res.json(new ApiResponse('Address updated successfully', address));
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const address = await Address.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
			});

			if (!address) throw new ApiError(404, 'Address not found');

			await address.destroy();
			return res.json(new ApiResponse('Address deleted successfully', address));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = AddressController;
