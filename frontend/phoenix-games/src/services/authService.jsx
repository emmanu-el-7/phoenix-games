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
	const token = localStorage.getItem('token');
	const config = requestConfig('POST', null, {
		Authorization: `Bearer ${token}`,
	});

	try {
		await fetch(api + '/logout', config);
		localStorage.removeItem('token');
		localStorage.removeItem('customer');
	} catch (error) {
		console.error('Error during logout:', error);
	}
};

const login = async (data) => {
	const config = requestConfig('POST', data);

	try {
		const res = await fetch(api + '/login', config);
		const responseData = await res.json();

		if (res.ok) {
			localStorage.setItem('customer', JSON.stringify(responseData));
			localStorage.setItem('token', responseData.token);
			return responseData;
		} else {
			throw new Error('Failed to login');
		}
	} catch (error) {
		console.error('Error during login:', error);
		throw error;
	}
};

const isLoggedIn = () => {
	return !!localStorage.getItem('customer');
};

const getCustomerDetails = async (customerId) => {
	const token = localStorage.getItem('token');
	const config = requestConfig('GET', null, {
		Authorization: `Bearer ${token}`,
	});

	try {
		const res = await fetch(`${api}/customer/${customerId}`, config);
		if (!res.ok) {
			throw new Error('Failed to fetch customer details');
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching customer details:', error);
		throw error;
	}
};

const authService = {
	register,
	logout,
	login,
	isLoggedIn,
	getCustomerDetails,
};

export default authService;
