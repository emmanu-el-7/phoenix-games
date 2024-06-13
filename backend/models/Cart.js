const knex = require('../config/db');

const Cart = {
	getAll: () => {
		return knex('cart').select('*');
	},
	getById: (id) => {
		return knex('cart').where({ id }).first();
	},
	create: (cart) => {
		const timestamp = new Date().toISOString();
		return knex('cart')
			.insert({
				...cart,
				created_at: timestamp,
				updated_at: timestamp,
			})
			.returning('*');
	},
	update: (id, cart) => {
		const timestamp = new Date().toISOString();
		return knex('cart')
			.where({ id })
			.update({
				...cart,
				updated_at: timestamp,
			})
			.returning('*');
	},
	delete: (id) => {
		return knex('cart').where({ id }).del();
	},
	addToCart: (customer_id, product_id) => {
		const timestamp = new Date().toISOString();
		return knex('cart')
			.insert({
				customer_id: customer_id,
				product_id: product_id,
				created_at: timestamp,
				updated_at: timestamp,
			})
			.returning('*');
	},
};

module.exports = Cart;
