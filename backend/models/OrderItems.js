const knex = require('../config/db');

const OrderItems = {
	getAll: () => {
		return knex('order_items').select('*');
	},
	getById: (id) => {
		return knex('order_items').where({ id }).first();
	},
	getByOrderId: (orderId) => {
		return knex('order_items').where({ order_id: orderId }).select('*');
	},
	create: (orderItem) => {
		const { order_id, product_name, price } = orderItem;

		if (!order_id || !product_name || !price) {
			throw new Error(
				'Todos os campos são obrigatórios: order_id, product_name, price'
			);
		}

		return knex('order_items').insert(orderItem).returning('*');
	},
	update: (id, orderItem) => {
		return knex('order_items').where({ id }).update(orderItem).returning('*');
	},
	delete: (id) => {
		return knex('order_items').where({ id }).del();
	},
};

module.exports = OrderItems;
