import { api, requestConfig } from '../utils/config';

const profile = async (data, token) => {
	const config = requestConfig('GET', data, token);

	try {
		const res = await fetch(api + '/customers/profile', config)
			.then((res) => res.json())
			.catch((err) => err);
		return res;
	} catch (error) {
		console.log(error);
	}
};

const updateProfile = async (data, token) => {
	const config = requestConfig('PUT', data, token, true);

	try {
		const res = await fetch(api + '/customers/', config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

const getCustomerDetails = async (id) => {
	const config = requestConfig('GET');
	try {
		const res = await fetch(api + '/customers/' + id, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

const customerService = {
	profile,
	updateProfile,
	getCustomerDetails,
};

export default customerService;
