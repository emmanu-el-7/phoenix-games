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
		path: '/order_items/{id}',
		handler: orderItemsController.removeOrderItem,
	},
];
