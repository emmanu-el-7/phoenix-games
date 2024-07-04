const knex = require('../config/db');

const Product = {
	getAll: () => {
		return knex('products').select('*');
	},
	getById: (id) => {
		return knex('products').where({ id }).first();
	},
	getByIds: (ids) => {
		return knex('products').whereIn('id', ids).select('*');
	},
	create: (product) => {
		return knex('products').insert(product).returning('*');
	},
	update: (id, product) => {
		return knex('products').where({ id }).update(product).returning('*');
	},
	delete: (id) => {
		return knex('products').where({ id }).del();
	},
	searchByName: (name) => {
		return knex('products').where('name', 'ilike', `%${name}%`).select('*');
	},
};

module.exports = Product;
