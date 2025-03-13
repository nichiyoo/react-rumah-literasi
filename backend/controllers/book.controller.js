const ApiError = require('../libs/error');
const ApiResponse = require('../libs/response');

const { Book } = require('../models');

const BookController = {
	async index(req, res, next) {
		try {
			const books = await Book.findAll();
			return res.json(new ApiResponse('Books retrieved successfully', books));
		} catch (error) {
			next(error);
		}
	},

	async store(req, res, next) {
		try {
			const book = await Book.create(req.body);
			return res.json(new ApiResponse('Book created successfully', book));
		} catch (error) {
			next(error);
		}
	},

	async show(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const book = await Book.findOne({
				where: { id },
			});

			if (!book) throw new ApiError(404, 'Book not found');
			return res.json(new ApiResponse('Book retrieved successfully', book));
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const book = await Book.findOne({
				where: { id },
			});

			if (!book) throw new ApiError(404, 'Book not found');

			book.title = req.body.title || book.title;
			book.author = req.body.author || book.author;
			book.publisher = req.body.publisher || book.publisher;
			book.year = req.body.year || book.year;
			book.language = req.body.language || book.language;
			book.amount = req.body.amount || book.amount;
			book.cover = req.body.cover || book.cover;

			await book.save();
			return res.json(new ApiResponse('Book updated successfully', book));
		} catch (error) {
			next(error);
		}
	},

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) throw new ApiError(400, 'ID is required');

			const book = await Book.findOne({
				where: { id },
			});

			if (!book) throw new ApiError(404, 'Book not found');

			await book.destroy();
			return res.json(new ApiResponse('Book deleted successfully', book));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = BookController;
