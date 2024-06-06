export const api = 'http://localhost:3001';

export const requestConfig = (method, data = null, token = null) => {
	const config = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	if (data) {
		config.body = JSON.stringify(data);
	}

	return config;
};
