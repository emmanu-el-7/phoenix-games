import { api, requestConfig } from '../utils/config';

const OrderService = {
	getAllOrders: async (token) => {
		const config = requestConfig('GET', null, token);

		const response = await fetch(`${api}/orders`, config);
		if (!response.ok) {
			throw new Error('Failed to fetch orders');
		}
		return response.json();
	},
	getOrderById: async (id, token) => {
		const config = requestConfig('GET', null, token);

		const response = await fetch(`${api}/orders/${id}`, config);
		if (!response.ok) {
			throw new Error('Failed to fetch order');
		}
		return response.json();
	},
	createOrder: async (orderData, token) => {
		const config = requestConfig('POST', orderData, token);

		const response = await fetch(`${api}/orders`, config);
		if (!response.ok) {
			throw new Error('Failed to create order');
		}
		return response.json();
	},
	updateOrder: async (id, orderData, token) => {
		const config = requestConfig('PUT', orderData, token);

		const response = await fetch(`${api}/orders/${id}`, config);
		if (!response.ok) {
			throw new Error('Failed to update order');
		}
		return response.json();
	},
	deleteOrder: async (id, token) => {
		const config = requestConfig('DELETE', null, token);

		const response = await fetch(`${api}/orders/${id}`, config);
		if (!response.ok) {
			throw new Error('Failed to delete order');
		}
		return response.json();
	},
	checkout: async (checkoutData, token) => {
		const config = requestConfig('POST', checkoutData, token);

		const response = await fetch(`${api}/orders/checkout`, config);
		if (!response.ok) {
			throw new Error('Failed to checkout');
		}
		return response.json();
	},
};

export default OrderService;
