const orderItemsController = require('../controllers/orderItemsController');

module.exports = [
	{
		method: 'POST',
		path: '/orders/{order_id}/items',
		handler: orderItemsController.addOrderItem,
	},
	{
		method: 'GET',
		path: '/orders/{order_id}/items',
		handler: orderItemsController.listOrderItems,
	},
	{
		method: 'DELETE',
		path: '/orders/{order_id}/items/{product_id}',
		handler: orderItemsController.removeOrderItem,
	},
];
