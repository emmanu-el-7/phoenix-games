const OrderItems = require('../models/OrderItems');

const addOrderItem = async (request, h) => {
	const { order_id } = request.params;
	const { product_name, price } = request.payload;

	try {
		const orderItem = await OrderItems.create({
			order_id,
			product_name,
			price,
		});
		return h.response(orderItem).code(201);
	} catch (error) {
		return h.response({ error: error.message }).code(500);
	}
};

const listOrderItems = async (request, h) => {
	const { order_id } = request.params;

	try {
		const orderItems = await OrderItems.getByOrderId(order_id);
		return h.response(orderItems).code(200);
	} catch (error) {
		return h.response({ error: error.message }).code(500);
	}
};

const removeOrderItem = async (request, h) => {
	const { id } = request.params;

	try {
		const rowsDeleted = await OrderItems.delete(id);
		if (!rowsDeleted) {
			return h.response({ error: 'Order item not found' }).code(404);
		}
		return h.response({ success: true }).code(200);
	} catch (error) {
		return h.response({ error: error.message }).code(500);
	}
};

module.exports = {
	addOrderItem,
	listOrderItems,
	removeOrderItem,
};
