import { api, requestConfig } from '../utils/config';

const listCarts = async () => {
	const config = requestConfig('GET');
	try {
		const res = await fetch(api + '/carts', config);
		if (!res.ok) {
			throw new Error(`Error: ${res.status}`);
		}
		return await res.json();
	} catch (error) {
		console.error('Error fetching carts:', error);
		throw error;
	}
};

const showCart = async (id) => {
	const config = requestConfig('GET');
	try {
		const res = await fetch(`${api}/carts/${id}`, config);
		return await res.json();
	} catch (error) {
		console.error(`Error fetching cart ${id}:`, error);
		throw error;
	}
};

const createCart = async (data, token) => {
	const config = requestConfig('POST', data, token);
	try {
		const res = await fetch(api + '/carts', config);
		return await res.json();
	} catch (error) {
		console.error('Error creating cart:', error);
		throw error;
	}
};

const updateCart = async (id, data, token) => {
	const config = requestConfig('PUT', data, token);
	try {
		const res = await fetch(`${api}/carts/${id}`, config);
		return await res.json();
	} catch (error) {
		console.error(`Error updating cart ${id}:`, error);
		throw error;
	}
};

const deleteCart = async (id, token) => {
	const config = requestConfig('DELETE', null, token);
	try {
		const res = await fetch(`${api}/carts/${id}`, config);
		return await res.json();
	} catch (error) {
		console.error(`Error deleting cart ${id}:`, error);
		throw error;
	}
};

const addToCart = async (customer_id, product_id) => {
	const data = { customer_id, product_id };
	const config = requestConfig('POST', data);

	try {
		const res = await fetch(`${api}/carts/add-to-cart`, config);
		if (!res.ok) {
			throw new Error(`Error: ${res.status}`);
		}
		return await res.json();
	} catch (error) {
		console.error('Error adding product to cart:', error);
		throw error;
	}
};

const removeFromCart = async (clientId, productId) => {
	const config = requestConfig('POST', { clientId, productId });
	try {
		const res = await fetch(`${api}/carts/remove-from-cart`, config);
		if (!res.ok) {
			throw new Error(`Error: ${res.status}`);
		}
		return await res.json();
	} catch (error) {
		console.error('Error removing item from cart:', error);
		throw error;
	}
};

const cartService = {
	listCarts,
	showCart,
	createCart,
	updateCart,
	deleteCart,
	addToCart,
	removeFromCart,
};

export default cartService;
