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
	getItemsByClientId: (clientId) => {
		return knex('cart')
			.where({ client_id: clientId })
			.join('products', 'cart.product_id', 'products.id')
			.select('products.*', 'cart.quantity');
	},
	removeFromCart: (clientId, productId) => {
		return knex('cart')
			.where({ client_id: clientId, product_id: productId })
			.del();
	},
};

module.exports = Cart;
