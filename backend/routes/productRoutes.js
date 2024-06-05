const productControler = require('../controllers/productController');

module.exports = [
	{
		method: 'GET',
		path: '/products',
		handler: productControler.listProducts,
	},
	{
		method: 'GET',
		path: '/products/{id}',
		handler: productControler.showProduct,
	},
	{
		method: 'POST',
		path: '/products',
		handler: productControler.createProduct,
	},
	{
		method: 'PUT',
		path: '/products/{id}',
		handler: productControler.updateProduct,
	},
	{
		method: 'DELETE',
		path: '/products/{id}',
		handler: productControler.deleteProduct,
	},
	{
		method: 'GET',
		path: '/search',
		handler: productControler.searchProducts,
	},
];
