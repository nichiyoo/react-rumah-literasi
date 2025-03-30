const authorize = (role) => async (req, res, next) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				message: 'You are not authorized to access this resource',
			});
		}

		if (req.user.role !== role) {
			return res.status(403).json({
				message: 'You are not authorized to access this resource',
			});
		}

		next();
	} catch (error) {
		next(error);
	}
};

const scope = {
	authorize(user) {
		if (user.role === 'admin') return {};

		return {
			where: {
				user_id: user.id,
			},
		};
	},
};

module.exports = {
	scope,
	authorize,
};
