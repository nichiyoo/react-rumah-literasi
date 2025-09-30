const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { BookDonation } = require('../models');
const { ROLES } = require('../libs/constant');

const BookDonationController = {
	async index(req, res, next) {
		try {
			const bookDonations = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findAll({
				include: 'user',
			});
			return res.json(
				new ApiResponse('Book Donations retrieved successfully', bookDonations)
			);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const bookDonation = await BookDonation.create({
				...req.body,
				user_id: req.user.id,
			});

			return res.json(
				new ApiResponse('Book Donation created successfully', bookDonation)
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
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
				include: 'user',
			});

			if (!bookDonation) throw new ApiError(404, 'Book Donation not found');
			return res.json(
				new ApiResponse('Book Donation retrieved successfully', bookDonation)
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
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
			});

			if (!bookDonation) throw new ApiError(404, 'Book Donation not found');
			await bookDonation.update(req.body);
			await bookDonation.save();

			return res.json(
				new ApiResponse('Book Donation updated successfully', bookDonation)
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
				method: ['authorize', req.user, [ROLES.ADMIN]],
			}).findOne({
				where: { id },
			});

			if (!bookDonation) throw new ApiError(404, 'Book Donation not found');
			const pending = bookDonation.status === 'pending';
			if (!pending) {
				throw new ApiError(
					400,
					'Cannot delete bookDonation unless the status is pending'
				);
			}

			await bookDonation.destroy();
			return res.json(
				new ApiResponse('Book Donation deleted successfully', bookDonation)
			);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = BookDonationController;
