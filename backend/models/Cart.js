const knex = require('../config/db');

const Cart = {
	getAll: () => {
		return knex('carts').select('*');
	},
	getById: (id) => {
		return knex('carts').where({ id }).first();
	},
	create: (cart) => {
		const timestamp = new Date().toISOString();
		return knex('carts')
			.insert({
				...cart,
				created_at: timestamp,
				updated_at: timestamp,
			})
			.returning('*');
	},
	update: (id, cart) => {
		const timestamp = new Date().toISOString();
		return knex('carts')
			.where({ id })
			.update({
				...cart,
				updated_at: timestamp,
			})
			.returning('*');
	},
	delete: (id) => {
		return knex('carts').where({ id }).del();
	},
};

module.exports = Cart;
