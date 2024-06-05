const Joi = require('joi');

const validate = (schema) => {
	return {
		validate: {
			payload: schema,
			failAction: (request, h, error) => {
				const extractedErrors = error.details.map((err) => err.message);
				const response = h.response({
					statusCode: 422,
					errors: extractedErrors,
				});
				response.code(422);
				return response.takeover();
			},
		},
	};
};

module.exports = validate;
