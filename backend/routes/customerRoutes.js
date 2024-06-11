const customerController = require('../controllers/customerController');

module.exports = [
	{
		method: 'POST',
		path: '/register',
		handler: customerController.register,
	},
	{
		method: 'POST',
		path: '/login',
		handler: customerController.login,
	},
	{
		method: 'POST',
		path: '/logout',
		handler: customerController.logout,
	},
	{
		method: 'GET',
		path: '/me',
		handler: customerController.getCurrentCustomer,
	},
	{
		method: 'PUT',
		path: '/update',
		handler: customerController.update,
	},
	{
		method: 'GET',
		path: '/customer/{id}',
		handler: customerController.getCustomerById,
	},
	{
		method: 'GET',
		path: '/customers',
		handler: customerController.getAllCustomers,
	},
];
