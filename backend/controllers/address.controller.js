const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Address } = require('../models');
const { ROLES } = require('../libs/constant');
const { Op } = require('sequelize');
const biteship = require('../libs/biteship');

const AddressController = {
	async index(req, res, next) {
		try {
			const addresses = await Address.scope({
				method: ['authorize', req.user],
			}).findAll({
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
			const addresses = await Address.scope({
				method: ['authorize', req.user],
			}).findAll();

			if (addresses.lenght >= 10) {
				throw new ApiError(
					400,
					"You've reached the maximum limit of addresses"
				);
			}

			const { data } = await biteship.post('/v1/locations', {
				name: req.body.name,
				contact_name: req.body.contact_name,
				contact_phone: req.body.contact_phone,
				address: req.body.street_address,
				note: req.body.note,
				postal_code: req.body.zipcode,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				type: 'origin',
			});

			const address = await Address.create({
				...req.body,
				user_id: req.user.id,
				area_id: data.id,
				is_default: addresses.length === 0,
			});

			return res.json(new ApiResponse('Address created successfully', address));
		} catch (error) {
			next(error);
		}
	},

	async setDefault(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const address = await Address.scope({
				method: ['authorize', req.user],
			}).findOne({
				where: { id },
			});

			if (!address) throw new ApiError(404, 'Address not found');
			await Address.scope({
				method: ['authorize', req.user],
			}).update(
				{ is_default: false },
				{
					where: {
						user_id: req.user.id,
						id: { [Op.ne]: id },
					},
				}
			);
			await address.update({ is_default: true });
			await address.save();

			return res.json(
				new ApiResponse('Default address updated successfully', address)
			);
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const address = await Address.scope({
				method: ['authorize', req.user],
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
				method: ['authorize', req.user],
			}).findOne({
				where: { id },
			});

			if (!address) throw new ApiError(404, 'Address not found');
			await address.update(req.body);
			await biteship.put('/v1/locations/' + address.area_id, {
				name: req.body.name,
				contact_name: req.body.contact_name,
				contact_phone: req.body.contact_phone,
				address: req.body.street_address,
				note: req.body.note,
				postal_code: req.body.zipcode,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
			});
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
				method: ['authorize', req.user],
			}).findOne({
				where: { id },
			});

			if (!address) throw new ApiError(404, 'Address not found');
			await address.destroy();
			await biteship.delete('/v1/locations/' + address.area_id);

			return res.json(new ApiResponse('Address deleted successfully', address));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = AddressController;
