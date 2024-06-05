require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const PORT = process.env.PORT || 3001;
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const environment = process.env.NODE_ENV || 'development';
const db = Knex(knexConfig[environment]);

const init = async () => {
	const server = Hapi.server({
		port: PORT,
		host: '0.0.0.0',
		routes: {
			cors: {
				origin: ['*'],
				additionalHeaders: ['cache-control', 'x-requested-with'],
			},
		},
	});

	server.app.db = db;

	server.route(productRoutes);
	server.route(cartRoutes);
	server.route(customerRoutes);
	server.route(orderRoutes);

	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
