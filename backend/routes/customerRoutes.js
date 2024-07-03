const path = require('path');
const customerController = require('../controllers/customerController');
const { options } = require('joi');

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
		options: {
			payload: {
				parse: true,
				allow: 'application/json',
			},
		},
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
	{
		method: 'DELETE',
		path: '/customer/{id}',
		handler: customerController.deleteCustomer,
	},
];
