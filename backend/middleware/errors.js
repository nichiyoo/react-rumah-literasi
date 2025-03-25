const errorHandler = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	process.env.NODE_ENV === 'development' && console.log(err);

	switch (err.name) {
		case 'SequelizeValidationError':
			res.status(400);
			break;

		case 'ApiError':
			res.status(err.status);
			break;

		default:
			res.status(500);
	}

	res.json({
		message: err.message,
	});
};

module.exports = errorHandler;
