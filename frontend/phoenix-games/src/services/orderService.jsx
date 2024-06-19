import { api, requestConfig } from '../utils/config';

const OrderService = {
	getAllOrders: async () => {
		const response = await fetch(api + '/orders');
		if (!response.ok) {
			throw new Error('Failed to fetch orders');
		}
		return response.json();
	},
	getOrderById: async (id) => {
		const response = await fetch(`${api}/orders/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch order');
		}
		return response.json();
	},
	createOrder: async (orderData) => {
		const response = await fetch(api + '/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		});
		if (!response.ok) {
			throw new Error('Failed to create order');
		}
		return response.json();
	},
	updateOrder: async (id, orderData) => {
		const response = await fetch(`${api}/orders/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		});
		if (!response.ok) {
			throw new Error('Failed to update order');
		}
		return response.json();
	},
	deleteOrder: async (id) => {
		const response = await fetch(`${api}/orders/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error('Failed to delete order');
		}
		return response.json();
	},
	checkout: async (checkoutData) => {
		const response = await fetch(`${api}/orders/checkout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(checkoutData),
		});
		if (!response.ok) {
			throw new Error('Failed to checkout');
		}
		return response.json();
	},
};

export default OrderService;
