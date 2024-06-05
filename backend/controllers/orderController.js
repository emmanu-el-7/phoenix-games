const Order = require('../models/Order');

const listOrders = async (request, h) => {
	try {
		const orders = await Order.getAll();
		return h.response(orders).code(200);
	} catch (error) {
		return h.response(error).code(500);
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
		return h.response(error).code(500);
	}
};

const createOrder = async (request, h) => {
	try {
		const newOrder = await Order.create(request.payload);
		return h.response(newOrder).code(201);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const updateOrder = async (request, h) => {
	try {
		const updatedOrder = await Order.update(request.params.id, request.payload);
		if (!updatedOrder) {
			return h.response({ error: 'Order not found' }).code(404);
		}
		return h.response(updatedOrder).code(200);
	} catch (error) {
		return h.response(error).code(500);
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
		return h.response(error).code(500);
	}
};

module.exports = {
	listOrders,
	showOrder,
	createOrder,
	updateOrder,
	deleteOrder,
};