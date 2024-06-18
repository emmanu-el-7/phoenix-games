const OrderItemController = require('../controllers/orderItemsController');

module.exports = [
	{
		method: 'POST',
		path: '/orders/{order_id}/items',
		handler: OrderItemController.addOrderItem,
	},
];
