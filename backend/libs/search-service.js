const { Op } = require('sequelize');

class SearchService {
	constructor(sequelize) {
		this.sequelize = sequelize;
	}

	async search(model, search, filters, pagination, include = [], fields = []) {
		const where = {};

		if (search && fields.length > 0) {
			where[Op.or] = fields.map((field) => ({
				[field]: {
					[Op.iLike]: `%${search}%`,
				},
			}));
		}

		Object.assign(where, filters || {});
		const { limit, offset } = this.paginate(pagination);

		return await model.findAndCountAll({
			where,
			limit,
			offset,
			include,
			order: [['createdAt', 'DESC']],
		});
	}

	paginate(pagination) {
		const page = parseInt(pagination.page) || 1;
		const limit = parseInt(pagination.limit) || 5;
		const offset = (page - 1) * limit;

		return {
			limit,
			offset,
		};
	}
}

module.exports = SearchService;
