const Order = require('../models/Order');

const listOrders = async (request, h) => {
	try {
		const orders = await Order.getAll();
		return h.response(orders).code(200);
	} catch (error) {
		console.error('Error listing orders:', error);
		return h.response({ error: 'Failed to list orders' }).code(500);
	}
};

const showOrder = async (request, h) => {
	try {
		const order = await Order.getById(request.params.id);
		if (!order) {
			return h.response({ error: 'Order not found' }).code(404);
		}
		return h.response(order).code(200);
	} catch (error) {
		console.error('Error fetching order:', error);
		return h.response({ error: 'Failed to fetch order' }).code(500);
	}
};

const createOrder = async (request, h) => {
	const { customer_id } = request.payload;

	if (!customer_id) {
		return h.response({ error: 'Invalid order data' }).code(400);
	}

	try {
		const newOrder = await Order.create({ customer_id });
		console.log('newOrder', newOrder);
		console.log('customer_id', customer_id);

		return h.response(newOrder).code(201);
	} catch (error) {
		console.error('Error creating order:', error);
		return h.response({ error: 'Failed to create order' }).code(500);
	}
};

const updateOrder = async (request, h) => {
	const { id } = request.params;
	const { customer_id, items } = request.payload;

	if (!customer_id || !items || !Array.isArray(items) || items.length === 0) {
		return h.response({ error: 'Invalid order data' }).code(400);
	}

	try {
		const updatedOrder = await Order.update(id, { customer_id, items });
		if (!updatedOrder) {
			return h.response({ error: 'Order not found' }).code(404);
		}
		return h.response(updatedOrder).code(200);
	} catch (error) {
		console.error('Error updating order:', error);
		return h.response({ error: 'Failed to update order' }).code(500);
	}
};

const deleteOrder = async (request, h) => {
	try {
		const rowsDeleted = await Order.delete(request.params.id);
		if (!rowsDeleted) {
			return h.response({ error: 'Order not found' }).code(404);
		}
		return h.response({ success: true }).code(200);
	} catch (error) {
		console.error('Error deleting order:', error);
		return h.response({ error: 'Failed to delete order' }).code(500);
	}
};

const checkout = async (customerId, items) => {
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
		console.error('Error during checkout:', error);
		throw error;
	}
};

const getCurrentOrder = async (request, h) => {
	const { customer_id } = request.query;

	try {
		const currentOrder = await Order.getCurrentOrder(customer_id);
		if (!currentOrder) {
			return h.response({ error: 'No current order found' }).code(404);
		}
		return h.response(currentOrder).code(200);
	} catch (error) {
		console.error('Error fetching current order:', error);
		return h.response({ error: 'Failed to fetch current order' }).code(500);
	}
};

module.exports = {
	listOrders,
	showOrder,
	createOrder,
	updateOrder,
	deleteOrder,
	checkout,
	getCurrentOrder,
};
