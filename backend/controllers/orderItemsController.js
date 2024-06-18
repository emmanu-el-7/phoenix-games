const OrderItem = require('../models/OrderItems');

const addOrderItem = async (request, h) => {
	const { order_id } = request.params;
	const { product_name } = request.payload;
	try {
		const orderItem = await OrderItem.create({
			order_id,
			product_name,
		});
		return h.response(orderItem).code(201);
	} catch (error) {
		return h.response({ error: error.message }).code(500);
	}
};

module.exports = {
	addOrderItem,
};
