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
	addFavorite: async (customerId, productId) => {
		try {
			const customer = await knex('customers')
				.where({ id: customerId })
				.first();
			if (!customer) {
				throw new Error(`Customer with ID ${customer.id} not found`);
			}

			let favorites = customer.favorites || [];
			if (!Array.isArray(favorites)) {
				favorites = [];
			}

			if (!favorites.includes(productId)) {
				favorites.push(productId);
				await knex('customers')
					.where({ id: customerId })
					.update({ favorites })
					.returning('*');
			}
			return favorites;
		} catch (error) {
			console.error('Error in addFavorite:', error);
			throw error;
		}
	},
	getFavorites: async (customerId) => {
		try {
			const customer = await knex('customers')
				.where({ id: customerId })
				.first();
			if (!customer) {
				throw new Error(`Customer with ID ${customer.id} not found`);
			}

			let favorites = customer.favorites || [];
			if (!Array.isArray(favorites)) {
				favorites = [];
			}

			return favorites;
		} catch (error) {
			console.error('Error in getFavorites:', error);
			throw error;
		}
	},
};

module.exports = Customer;
