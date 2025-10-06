/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataType) {
		await queryInterface.createTable('addresses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataType.INTEGER,
			},
			street_address: {
				allowNull: false,
				type: DataType.STRING,
			},
			latitude: {
				allowNull: false,
				type: DataType.FLOAT,
			},
			longitude: {
				allowNull: false,
				type: DataType.FLOAT,
			},
			province_id: {
				allowNull: false,
				type: DataType.STRING,
				references: {
					model: 'provinces',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			city_id: {
				allowNull: false,
				type: DataType.STRING,
				references: {
					model: 'cities',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			district_id: {
				allowNull: false,
				type: DataType.STRING,
				references: {
					model: 'districts',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			zipcode: {
				allowNull: false,
				type: DataType.STRING,
			},
			note: {
				allowNull: true,
				type: DataType.STRING,
			},
			is_default: {
				allowNull: false,
				type: DataType.BOOLEAN,
				defaultValue: false,
			},
			user_id: {
				allowNull: false,
				type: DataType.INTEGER,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			created_at: {
				allowNull: false,
				type: DataType.DATE,
				defaultValue: DataType.NOW,
			},
			updated_at: {
				allowNull: false,
				type: DataType.DATE,
				defaultValue: DataType.NOW,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('addresses');
	},
};
