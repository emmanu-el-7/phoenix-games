/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST || 'db',
			database: process.env.DB_NAME || 'phoenix',
			user: process.env.DB_USER || 'admin',
			password: process.env.DB_PASS || '33696549',
			port: process.env.DB_PORT || 5432,
		},
	},
};
