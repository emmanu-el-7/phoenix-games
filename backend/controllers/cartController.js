const knex = require('../config/db');
const Cart = require('../models/Cart');

const listCarts = async (request, h) => {
	try {
		const carts = await Cart.getAll();
		return h.response(carts).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const showCart = async (request, h) => {
	try {
		const cart = await Cart.getById(request.params.id);
		if (!cart) {
			return h.response({ error: 'cart not found' }).code(404);
		}
		return h.response(cart).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const createCart = async (request, h) => {
	try {
		const newCart = await Cart.create(request.payload);
		return h.response(newCart).code(201);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const updateCart = async (request, h) => {
	try {
		const updatedCart = await Cart.update(request.params.id, request.payload);
		if (!updatedCart) {
			return h.response({ error: 'cart not found' }).code(404);
		}
		return h.response(updatedCart).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const deleteCart = async (request, h) => {
	try {
		const rowsDeleted = await Cart.delete(request.params.id);
		if (!rowsDeleted) {
			return h.response({ error: 'cart not found' }).code(404);
		}
		return h.response({ success: true }).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const addToCart = async (request, h) => {
	try {
		const { customer_id, product_id } = request.payload;
		const timestamp = new Date().toISOString();
		const insertedCart = await knex('cart')
			.insert({
				customer_id,
				product_id,
				created_at: timestamp,
				updated_at: timestamp,
			})
			.returning('*');

		return h.response(insertedCart[0]).code(201);
	} catch (error) {
		console.error('Error adding product to cart:', error);
		return h.response(error).code(500);
	}
};

const removeFromCart = async (request, h) => {
	const { clientId, productId } = request.payload;
	try {
		const result = await Cart.removeFromCart(clientId, productId);
		return h.response(result).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

module.exports = {
	listCarts,
	showCart,
	createCart,
	updateCart,
	deleteCart,
	addToCart,
	removeFromCart,
};
