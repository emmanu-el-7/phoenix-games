const knex = require('../config/db');

const Product = {
	getAll: () => {
		return knex('product').select('*');
	},
	getById: (id) => {
		return knex('product').where({ id }).first();
	},
	getByIds: (ids) => {
		return knex('product').whereIn('id', ids).select('*');
	},
	create: (product) => {
		return knex('product').insert(product).returning('*');
	},
	update: (id, product) => {
		return knex('product').where({ id }).update(product).returning('*');
	},
	delete: (id) => {
		return knex('product').where({ id }).del();
	},
};

module.exports = Product;
