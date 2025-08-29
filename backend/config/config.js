require('dotenv').config();

module.exports = {
	development: {
		dialect: 'sqlite',
		storage: './database/development.sqlite',
		migrationStorageTableName: 'sequelize_meta',
		logging: false,
	},
	test: {
		dialect: 'sqlite',
		storage: './database/test.sqlite',
		migrationStorageTableName: 'sequelize_meta',
		logging: false,
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: process.env.DATABASE_DIALECT,
		dialectOptions: { ssl: true },
		migrationStorageTableName: 'sequelize_meta',
		logging: false,
	},
};
