const { ValidationError } = require('sequelize');

const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');
const SearchService = require('../libs/search-service');
const { bookDonationSchema } = require('../libs/schemas');
const { ROLES, PAYMENT_STATUS, DONATION_TYPES } = require('../libs/constant');
const { Op } = require('sequelize');
const LogService = require('../libs/log-service');

const PaymentController = require('./payment.controller');
const DeliveryController = require('./delivery.controller');
const { BookDonation, Address, sequelize } = require('../models');

const searchService = new SearchService(sequelize);

const BookDonationController = {
	async index(req, res, next) {
		try {
			const { search, page, limit, status } = req.query;

			const donations = BookDonation.scope({
				method: ['authorize', req.user, ROLES.LIBRARIAN],
			});

			const filters = {};
			if (status) filters.status = status;

			const paginate = searchService.paginate({ page, limit });
			const result = await searchService.search(
				donations,
				search,
				filters,
				{ page, limit },
				['user', 'address', 'book_donation_items'],
				[
					'$user.name$',
					'$user.email$',
					'$address.name$',
					'$address.street_address$',
					'acceptance_notes',
				]
			);

			return res.json(
				new ApiResponse('Book donations retrieved successfully', {
					rows: result.rows,
					pagination: {
						total: result.count,
						page: paginate.page,
						limit: paginate.limit,
						pages: Math.ceil(result.count / paginate.limit),
					},
				})
			);
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const validated = bookDonationSchema.parse(req.body.transaction);
			const address = await Address.scope({
				method: ['authorize', req.user],
			}).findOne({
				where: {
					id: validated.detail.address_id,
				},
			});

			if (!address) throw new ApiError(404, 'Address not found');
			const courier = await DeliveryController.courier(
				validated.detail,
				validated.courier,
				req.user
			);

			if (!courier) throw new ApiError(400, 'Invalid courier selection');
			if (courier.shipping_fee !== validated.courier.shipping_fee) {
				throw new ApiError(400, "There's a change in the courier price.");
			}

			const result = await sequelize.transaction(async (t) => {
				const donation = await BookDonation.create(
					{
						address_id: validated.detail.address_id,
						user_id: req.user.id,
						estimated_value: validated.detail.estimated_value,
						length: validated.detail.length,
						width: validated.detail.width,
						height: validated.detail.height,
						weight: validated.detail.weight,
						order_id: null,
						tracking_id: null,
						shipping_fee: courier.shipping_fee,
						shipping_eta: courier.duration,
						courier_code: courier.courier_code,
						courier_service_code: courier.courier_service_code,
						status: PAYMENT_STATUS.PENDING,
						book_donation_items: validated.items,
					},
					{
						include: ['book_donation_items'],
						transaction: t,
					}
				);

				const { data } = await PaymentController.midtrans(
					donation,
					req.user,
					DONATION_TYPES.BOOK
				);

				await donation.update(
					{
						payment_url: data.redirect_url,
						status: PAYMENT_STATUS.PENDING,
					},
					{ transaction: t }
				);

				return donation;
			});

			await LogService.createLog(
				'New book donation created',
				req.user.id,
				'Book Donation',
				result.id,
				`${req.user.name} created a book donation of Rp ${result.shipping_fee}`,
				{
					user_id: req.user.id,
					donation_id: result.id,
					amount: result.shipping_fee,
					status: result.status,
				},
				req
			);

			return res.json(
				new ApiResponse('Book donation submitted successfully', result)
			);
		} catch (error) {
			if (error instanceof ApiError) return next(error);
			if (error instanceof ValidationError) {
				return next(
					new ApiError(
						400,
						'Failed to submit book donation',
						error.issues.map((issue) => issue.message).join(', ')
					)
				);
			}
			return next(
				new ApiError(
					error.response?.status || 500,
					error.response?.data.message || error.message,
					error.response?.data
				)
			);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const donation = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id },
				include: ['user', 'address', 'book_donation_items'],
			});
			if (!donation) throw new ApiError(404, 'Book donation not found');

			return res.json(
				new ApiResponse('Book donation retrieved successfully', donation)
			);
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const donation = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id },
			});
			if (!donation) throw new ApiError(404, 'Book donation not found');

			await donation.update({
				...req.body,
			});
			return res.json(
				new ApiResponse('Book donation updated successfully', donation)
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

	async track(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) throw new ApiError(400, 'ID is required');

			const bookDonation = await BookDonation.scope({
				method: ['authorize', req.user, [ROLES.LIBRARIAN]],
			}).findOne({
				where: { id },
			});

			if (!bookDonation) throw new ApiError(404, 'Book donation not found');
			if (!bookDonation.tracking_id)
				throw new ApiError(404, 'Tracking ID not available');

			const trackingResult = await DeliveryController.track(
				bookDonation.tracking_id
			);

			return res.json(
				new ApiResponse(
					'Book donation tracking retrieved successfully',
					trackingResult
				)
			);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = BookDonationController;
