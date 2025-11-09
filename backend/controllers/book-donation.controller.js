const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');
const { transactionSchema } = require('../libs/schemas');

const {
	BookDonation,
	Address,
	BookDonationItem,
	sequelize,
} = require('../models');
const DeliveryController = require('./delivery.controller');
const PaymentController = require('./payment.controller');
const { ROLES, PAYMENT_STATUS } = require('../libs/constant');

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
			const validated = transactionSchema.parse(req.body.transaction);

			const addr = await Address.scope({
				method: ['authorize', req.user],
			}).findOne({
				where: { id: validated.detail.address_id },
			});
			if (!addr) throw new ApiError(404, 'Address not found');

			await DeliveryController.validatePrice(
				validated.detail,
				validated.courier,
				req.user
			);

			const result = await sequelize.transaction(async (t) => {
				const donation = await BookDonation.create(
					{
						amount: validated.courier.price,
						address_id: validated.detail.address_id,
						user_id: req.user.id,
						length: validated.detail.length,
						width: validated.detail.width,
						height: validated.detail.height,
						weight: validated.detail.weight,
						status: PAYMENT_STATUS.PENDING,
					},
					{ transaction: t }
				);

				await BookDonationItem.bulkCreate(
					validated.items.map((item) => ({
						...item,
						book_donation_id: donation.id,
					})),
					{ transaction: t }
				);

				const { data } = await PaymentController.midtrans(donation, req.user);
				await donation.update(
					{
						payment_url: data.redirect_url,
						status: PAYMENT_STATUS.PENDING,
					},
					{ transaction: t }
				);

				return donation;
			});

			return res
				.status(201)
				.json(new ApiResponse('Book donation submitted successfully', result));
		} catch (error) {
			if (error && error.issues) {
				const message = error.issues.map((issue) => issue.message).join(', ');
				return next(new ApiError(400, message));
			}
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
				include: ['user', 'address', 'book_donation_items'],
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
			if (address_id) {
				const addr = await Address.scope({
					method: ['authorize', req.user],
				}).findOne({
					where: { id: address_id },
				});
				if (!addr) throw new ApiError(404, 'Address not found');
			}

			await bookDonation.update({ ...data, address_id });

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

			if (bookDonation.status !== PAYMENT_STATUS.PENDING) {
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
