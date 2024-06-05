const Joi = require('joi');

const customerCreateValidation = () => {
	return Joi.object({
		name: Joi.string().min(3).required().messages({
			'string.base': 'O nome deve ser uma string.',
			'string.empty': 'O nome é obrigatório.',
			'string.min': 'O nome precisa ter no mínimo {#limit} caracteres.',
			'any.required': 'O nome é obrigatório.',
		}),
		email: Joi.string().email().required().messages({
			'string.base': 'O email deve ser uma string.',
			'string.empty': 'O email é obrigatório.',
			'string.email': 'Insira um e-mail válido.',
			'any.required': 'O email é obrigatório.',
		}),
		password: Joi.string().min(6).required().messages({
			'string.base': 'A senha deve ser uma string.',
			'string.empty': 'A senha é obrigatória.',
			'string.min': 'A senha precisa ter no mínimo {#limit} caracteres.',
			'any.required': 'A senha é obrigatória.',
		}),
		confirmPassword: Joi.string()
			.valid(Joi.ref('password'))
			.required()
			.messages({
				'string.base': 'A confirmação de senha deve ser uma string.',
				'string.empty': 'A confirmação de senha é obrigatória.',
				'any.only': 'As senhas não são iguais.',
				'any.required': 'A confirmação de senha é obrigatória.',
			}),
	});
};

const loginValidation = () => {
	return Joi.object({
		email: Joi.string().email().required().messages({
			'string.base': 'O email deve ser uma string.',
			'string.empty': 'O email é obrigatório.',
			'string.email': 'Insira um e-mail válido.',
			'any.required': 'O email é obrigatório.',
		}),
		password: Joi.string().required().messages({
			'string.base': 'A senha deve ser uma string.',
			'string.empty': 'A senha é obrigatória.',
			'any.required': 'A senha é obrigatória.',
		}),
	});
};

const customerUpdateValidation = () => {
	return Joi.object({
		name: Joi.string().min(3).optional().messages({
			'string.base': 'O nome deve ser uma string.',
			'string.min': 'O nome precisa ter no mínimo {#limit} caracteres.',
		}),
		password: Joi.string().min(6).optional().messages({
			'string.base': 'A senha deve ser uma string.',
			'string.min': 'A senha precisa ter no mínimo {#limit} caracteres.',
		}),
	});
};

module.exports = {
	customerCreateValidation,
	loginValidation,
	customerUpdateValidation,
};
