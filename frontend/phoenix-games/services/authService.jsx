import { api, requestConfig } from '../utils/config';

const register = async (data) => {
	const config = requestConfig('POST', data);

	try {
		const res = await fetch(api + '/customers/register', config)
			.then((res) => res.json())
			.catch((err) => err);

		if (res._id) {
			localStorage.setItem('customer', JSON.stringify(res));
		}

		return res;
	} catch (error) {
		console.log(error);
	}
};

const logout = async () => {
	localStorage.removeItem('customer');
};

const login = async (data) => {
	const config = requestConfig('POST', data);

	try {
		const res = await fetch(api + '/customers/login', config)
			.then((res) => res.json())
			.catch((err) => err);

		if (res._id) {
			localStorage.setItem('customer', JSON.stringify(res));
		}

		return res;
	} catch (error) {
		console.log(error);
	}
};

const authService = {
	register,
	logout,
	login,
};

export default authService;
