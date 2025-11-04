const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { BookDonation, Address } = require('../models');
const { ROLES } = require('../libs/constant');

const BookDonationController = {
	async index(req, res, next) {
		try {
			const bookDonations = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findAll({
				include: ['user', 'address'],
			});

			return res.json(
				new ApiResponse('Book donations retrieved successfully', bookDonations)
			);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const { address_id, ...data } = req.body;

			const address = await Address.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id: address_id },
			});
			if (!address) throw new ApiError(404, 'Address not found');

			const bookDonation = await BookDonation.create({
				...data,
				address_id,
				user_id: req.user.id,
			});

			return res.json(
				new ApiResponse('Book donation created successfully', bookDonation)
			);
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const bookDonation = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id },
				include: ['user', 'address'],
			});
			if (!bookDonation) throw new ApiError(404, 'Book donation not found');

			return res.json(
				new ApiResponse('Book donation retrieved successfully', bookDonation)
			);
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const bookDonation = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id },
			});
			if (!bookDonation) throw new ApiError(404, 'Book donation not found');

			const { address_id, ...data } = req.body;

			const address = await Address.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id: address_id },
			});
			if (!address) throw new ApiError(404, 'Address not found');

			bookDonation.address_id = address_id;
			await bookDonation.update(data);
			await bookDonation.save();

			return res.json(
				new ApiResponse('Book donation updated successfully', bookDonation)
			);
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const bookDonation = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id },
			});
			if (!bookDonation) throw new ApiError(404, 'Book donation not found');

			const validateStatus = bookDonation.status === 'pending';
			if (!validateStatus) {
				throw new ApiError(
					400,
					'Cannot delete bookDonation unless the status is pending'
				);
			}

			await bookDonation.destroy();
			return res.json(
				new ApiResponse('Book donation deleted successfully', bookDonation)
			);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = BookDonationController;
