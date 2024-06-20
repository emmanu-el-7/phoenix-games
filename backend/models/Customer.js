const knex = require('../config/db');
const { getFavorites } = require('../controllers/customerController');

const Customer = {
	getAll: () => {
		return knex('customers').select('*');
	},
	getById: (id) => {
		return knex('customers').where({ id }).first();
	},
	getByEmail: (email) => {
		return knex('customers').where({ email }).first();
	},
	create: (customer) => {
		return knex('customers').insert(customer).returning('*');
	},
	update: (id, customer) => {
		return knex('customers').where({ id }).update(customer).returning('*');
	},
	delete: (id) => {
		return knex('customers').where({ id }).del();
	},
};

module.exports = Customer;
