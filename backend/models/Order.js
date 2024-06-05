const knex = require('../config/db');

const Order = {
	getAll: () => {
		return knex('orders').select('*');
	},
	getById: (id) => {
		return knex('orders').where({ id }).first();
	},
	create: (order) => {
		const timestamp = new Date().toISOString();
		return knex('orders')
			.insert({
				...order,
				created_at: timestamp,
				updated_at: timestamp,
			})
			.returning('*');
	},
	update: (id, order) => {
		const timestamp = new Date().toISOString();
		return knex('orders')
			.where({ id })
			.update({
				...order,
				updated_at: timestamp,
			})
			.returning('*');
	},
	delete: (id) => {
		return knex('orders').where({ id }).del();
	},
};

module.exports = Order;
