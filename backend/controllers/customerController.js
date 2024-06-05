const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
	return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });
};

const register = async (request, h) => {
	const { name, email, password } = request.payload;
	const db = request.server.app.db;

	const existingCustomer = await db('customers').where({ email }).first();

	if (existingCustomer) {
		return h
			.response({ errors: ['Por favor, utilize outro e-mail.'] })
			.code(422);
	}

	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(password, salt);

	const [newCustomer] = await db('customers')
		.insert({
			name,
			email,
			password: passwordHash,
		})
		.returning('*');

	if (!newCustomer) {
		return h
			.response({ errors: ['Houve um erro, por favor tente mais tarde!'] })
			.code(422);
	}

	return h
		.response({
			id: newCustomer.id,
			token: generateToken(newCustomer.id),
		})
		.code(201);
};

const login = async (request, h) => {
	const { email, password } = request.payload;
	const db = request.server.app.db;

	const customer = await db('customers').where({ email }).first();

	if (!customer) {
		return h.response({ errors: ['Usuário não encontrado'] }).code(404);
	}

	const isMatch = await bcrypt.compare(password, customer.password);

	if (!isMatch) {
		return h.response({ errors: ['Senha incorreta'] }).code(422);
	}

	return h
		.response({
			id: customer.id,
			profileImage: customer.profileImage,
			token: generateToken(customer.id),
		})
		.code(200);
};

const getCurrentCustomer = async (request, h) => {
	const customer = request.auth.credentials;
	return h.response(customer).code(200);
};

const update = async (request, h) => {
	const { name, password } = request.payload;
	let profileImage = null;

	if (request.file) {
		profileImage = request.file.filename;
	}

	const db = request.server.app.db;
	const reqCustomer = request.auth.credentials;

	let updatedFields = { name };
	if (password) {
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		updatedFields.password = passwordHash;
	}
	if (profileImage) {
		updatedFields.profileImage = profileImage;
	}

	const [customer] = await db('customers')
		.where({ id: reqCustomer.id })
		.update(updatedFields)
		.returning('*');

	if (!customer) {
		return h.response({ errors: ['Usuário não encontrado'] }).code(404);
	}

	return h.response(customer).code(200);
};

const getCustomerById = async (request, h) => {
	const { id } = request.params;
	const db = request.server.app.db;

	try {
		const customer = await db('customers')
			.where({ id })
			.select('id', 'name', 'email', 'profileImage')
			.first();

		if (!customer) {
			return h.response({ errors: ['Usuário não encontrado'] }).code(404);
		}

		return h.response(customer).code(200);
	} catch (error) {
		return h.response({ errors: ['Erro ao buscar usuário.'] }).code(500);
	}
};

const getAllCustomers = async (request, h) => {
	const db = request.server.app.db;

	try {
		const customers = await db('customers');
		return h.response(customers).code(200);
	} catch (error) {
		console.error('Erro ao buscar clientes:', error);
		return h.response({ error: 'Erro ao buscar clientes' }).code(500);
	}
};

module.exports = {
	register,
	login,
	getCurrentCustomer,
	update,
	getCustomerById,
	getAllCustomers,
};
