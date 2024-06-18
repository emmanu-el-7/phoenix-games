const knex = require('../config/db');

const OrderItems = {
	getAll: () => {
		return knex('order_items').select('*');
	},
	getById: (id) => {
		return knex('order_items').where({ id }).first();
	},
	create: (product) => {
		return knex('order_items').insert(product).returning('*');
	},
	update: (id, product) => {
		return knex('order_items').where({ id }).update(product).returning('*');
	},
	delete: (id) => {
		return knex('order_items').where({ id }).del();
	},
};

module.exports = OrderItems;
