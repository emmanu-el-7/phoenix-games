const orderController = require('../controllers/orderController');

module.exports = [
	{
		method: 'GET',
		path: '/orders',
		handler: orderController.listOrders,
	},
	{
		method: 'GET',
		path: '/orders/{id}',
		handler: orderController.showOrder,
	},
	{
		method: 'POST',
		path: '/orders',
		handler: orderController.createOrder,
	},
	{
		method: 'PUT',
		path: '/orders/{id}',
		handler: orderController.updateOrder,
	},
	{
		method: 'DELETE',
		path: '/orders/{id}',
		handler: orderController.deleteOrder,
	},
	{
		method: 'POST',
		path: '/orders/checkout',
		handler: orderController.checkout,
	},
];
