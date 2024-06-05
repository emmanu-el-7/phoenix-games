const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (request, h) => {
	const authHeader = request.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return h.response(401).json({ errors: ['Acesso negado'] });
	}

	try {
		const checkedToken = jwt.verify(token, jwtSecret);

		req.customer = await Customer.query()
			.findById(checkedToken.id)
			.select('-password');

		h.continue;
	} catch (error) {
		h.response(401).json({ errors: ['Token inválido'] });
	}
};

module.exports = authGuard;
