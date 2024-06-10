import { api, requestConfig } from '../utils/config';

const register = async (data) => {
	const config = requestConfig('POST', data);

	try {
		const res = await fetch(api + '/register', config);
		if (!res.ok) {
			throw new Error('Failed to register');
		}

		const customer = await res.json();
		localStorage.setItem('customer', JSON.stringify(customer));
		return customer;
	} catch (error) {
		console.error('Error during registration:', error);
		throw error;
	}
};

const logout = async () => {
	localStorage.removeItem('customer');
};

const login = async (data) => {
	const config = requestConfig('POST', data);

	try {
		const res = await fetch(api + '/login', config);
		const responseData = await res.json();

		if (res.ok) {
			localStorage.setItem('customer', JSON.stringify(responseData));
			return responseData;
		} else {
			throw new Error('Failed to login');
		}
	} catch (error) {
		console.error('Error during login:', error);
		throw error;
	}
};

const authService = {
	register,
	logout,
	login,
};

export default authService;
