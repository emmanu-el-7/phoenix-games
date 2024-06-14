const Product = require('../models/Product');

const listProducts = async (request, h) => {
	try {
		const products = await Product.getAll();
		return h.response(products).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const showProduct = async (request, h) => {
	try {
		const product = await Product.getById(request.params.id);
		if (!product) {
			return h.response({ error: 'Product not found' }).code(404);
		}
		return h.response(product).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const createProduct = async (request, h) => {
	try {
		const newProduct = await Product.create(request.payload);
		return h.response(newProduct).code(201);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const updateProduct = async (request, h) => {
	try {
		const updatedProduct = await Product.update(
			request.params.id,
			request.payload
		);
		if (!updatedProduct) {
			return h.response({ error: 'Product not found' }).code(404);
		}
		return h.response(updatedProduct).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const deleteProduct = async (request, h) => {
	try {
		const rowsDeleted = await Product.delete(request.params.id);
		if (!rowsDeleted) {
			return h.response({ error: 'Product not found' }).code(404);
		}
		return h.response({ success: true }).code(200);
	} catch (error) {
		return h.response(error).code(500);
	}
};

const searchProducts = async (req, res) => {
	const { q } = req.query;

	try {
		const products = await Product.find({ title: new RegExp(q, 'i') }).exec();
		res.status(200).json(products);
	} catch (error) {
		console.error('Error searching products:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	listProducts,
	showProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	searchProducts,
};
