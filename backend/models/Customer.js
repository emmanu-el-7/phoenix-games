const knex = require('../config/db');

const Customer = {
	getAll: () => {
		return knex('customer').select('*');
	},
	getById: (id) => {
		return knex('customer').where({ id }).first();
	},
	getByEmail: (email) => {
		return knex('customer').where({ email }).first();
	},
	create: (customer) => {
		return knex('customer').insert(customer).returning('*');
	},
	update: (id, customer) => {
		return knex('customer').where({ id }).update(customer).returning('*');
	},
	delete: (id) => {
		return knex('customer').where({ id }).del();
	},
};

module.exports = Customer;
