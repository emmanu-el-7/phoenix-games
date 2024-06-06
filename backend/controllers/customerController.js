const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
	return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });
};

const register = async (request, h) => {
	const { name, email, password } = request.payload;

	try {
		const existingCustomer = await Customer.getByEmail(email);
		if (existingCustomer) {
			return h
				.response({ errors: ['Por favor, utilize outro e-mail.'] })
				.code(422);
		}

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newCustomer = await Customer.create({
			name,
			email,
			password: passwordHash,
		});

		const token = generateToken(newCustomer.id);

		return h.response({ id: newCustomer.id, token }).code(201);
	} catch (error) {
		console.error('Error registering customer:', error);
		return h
			.response({ errors: ['Houve um erro, por favor tente mais tarde!'] })
			.code(500);
	}
};

const login = async (request, h) => {
	console.log('Login');
	const { email, password } = request.payload;

	try {
		const customer = await Customer.getByEmail(email);
		if (!customer) {
			return h.response({ errors: ['Usuário não encontrado'] }).code(404);
		}

		const isMatch = await bcrypt.compare(password, customer.password);
		if (!isMatch) {
			return h.response({ errors: ['Senha incorreta'] }).code(422);
		}

		const token = generateToken(customer.id);

		return h
			.response({ id: customer.id, profileImage: customer.profileImage, token })
			.code(200);
	} catch (error) {
		console.error('Error logging in:', error);
		return h
			.response({ errors: ['Houve um erro, por favor tente mais tarde!'] })
			.code(500);
	}
};

const getCurrentCustomer = async (request, h) => {
	try {
		const customer = request.auth.credentials;
		return h.response(customer).code(200);
	} catch (error) {
		console.error('Error fetching current customer:', error);
		return h
			.response({ errors: ['Houve um erro ao buscar o cliente atual.'] })
			.code(500);
	}
};

const update = async (request, h) => {
	const { name, password } = request.payload;
	let profileImage = null;

	if (request.file) {
		profileImage = request.file.filename;
	}

	try {
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

		const customer = await Customer.update(reqCustomer.id, updatedFields);

		if (!customer) {
			return h.response({ errors: ['Usuário não encontrado'] }).code(404);
		}

		return h.response(customer).code(200);
	} catch (error) {
		console.error('Error updating customer:', error);
		return h
			.response({ errors: ['Houve um erro ao atualizar o cliente.'] })
			.code(500);
	}
};

const getCustomerById = async (request, h) => {
	const { id } = request.params;

	try {
		const customer = await Customer.getById(id);

		if (!customer) {
			return h.response({ errors: ['Usuário não encontrado'] }).code(404);
		}

		return h.response(customer).code(200);
	} catch (error) {
		console.error('Error fetching customer by ID:', error);
		return h
			.response({ errors: ['Houve um erro ao buscar o cliente.'] })
			.code(500);
	}
};

const getAllCustomers = async (request, h) => {
	try {
		const customers = await Customer.getAll();
		return h.response(customers).code(200);
	} catch (error) {
		console.error('Error fetching all customers:', error);
		return h
			.response({ errors: ['Houve um erro ao buscar todos os clientes.'] })
			.code(500);
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
