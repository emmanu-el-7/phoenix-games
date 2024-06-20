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
				order_date: timestamp,
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
	checkout: async (customerId, items) => {
		const timestamp = new Date().toISOString();
		const trx = await knex.transaction();
		try {
			const [order] = await trx('orders')
				.insert({
					customer_id: customerId,
					created_at: timestamp,
					updated_at: timestamp,
				})
				.returning('*');

			const orderItems = items.map((item) => ({
				order_id: order.id,
				product_name: item.product_name,
				price: item.price,
			}));

			await trx('order_items').insert(orderItems);
			await trx.commit();

			return order;
		} catch (error) {
			await trx.rollback();
			throw error;
		}
	},
};

module.exports = Order;
