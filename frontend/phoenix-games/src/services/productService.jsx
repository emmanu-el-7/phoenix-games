import { api, requestConfig } from '../utils/config';

const listProducts = async () => {
	const config = requestConfig('GET');
	try {
		const res = await fetch(api + '/products', config);
		if (!res.ok) {
			throw new Error(`Error: ${res.status}`);
		}
		return await res.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};

const getProductDetails = async (id) => {
	const config = requestConfig('GET');
	try {
		const res = await fetch(`${api}/products/${id}`, config);
		return await res.json();
	} catch (error) {
		console.error(`Error fetching product ${id}:`, error);
		throw error;
	}
};

const createProduct = async (data, token) => {
	const config = requestConfig('POST', data, token);
	try {
		const res = await fetch(api + '/products', config);
		return await res.json();
	} catch (error) {
		console.error('Error creating product:', error);
		throw error;
	}
};

const updateProduct = async (id, data, token) => {
	const config = requestConfig('PUT', data, token);
	try {
		const res = await fetch(`${api}/products/${id}`, config);
		return await res.json();
	} catch (error) {
		console.error(`Error updating product ${id}:`, error);
		throw error;
	}
};

const deleteProduct = async (id, token) => {
	const config = requestConfig('DELETE', null, token);
	try {
		const res = await fetch(`${api}/products/${id}`, config);
		return await res.json();
	} catch (error) {
		console.error(`Error deleting product ${id}:`, error);
		throw error;
	}
};

const searchProducts = async (query) => {
	try {
		const res = await fetch(`${api}/search?q=${query}`);
		if (!res.ok) {
			const errorText = await res.text();
			console.error('Error searching products:', errorText);
			throw new Error(`Error: ${res.status}`);
		}
		const data = await res.json();
		console.log('Fetched products:', data);
		return Array.isArray(data) ? data : [data];
	} catch (error) {
		console.error('Error searching products:', error);
		throw error;
	}
};

const productService = {
	listProducts,
	getProductDetails,
	createProduct,
	updateProduct,
	deleteProduct,
	searchProducts,
};

export default productService;
