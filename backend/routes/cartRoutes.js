const cartController = require('../controllers/cartController');

module.exports = [
	{
		method: 'GET',
		path: '/carts',
		handler: cartController.listCarts,
	},
	{
		method: 'GET',
		path: '/carts/{id}',
		handler: cartController.showCart,
	},
	{
		method: 'POST',
		path: '/carts',
		handler: cartController.createCart,
	},
	{
		method: 'PUT',
		path: '/carts/{id}',
		handler: cartController.updateCart,
	},
	{
		method: 'DELETE',
		path: '/carts/{id}',
		handler: cartController.deleteCart,
	},
	{
		method: 'POST',
		path: '/carts/add-to-cart',
		handler: cartController.addToCart,
	},
	{
		method: 'POST',
		path: '/carts/remove-from-cart',
		handler: cartController.removeFromCart,
	},
];
