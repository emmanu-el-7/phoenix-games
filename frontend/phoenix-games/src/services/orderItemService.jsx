import { api, requestConfig } from '../utils/config';

const OrderItemsService = {
	addOrderItem: async (orderId, itemData) => {
		const config = requestConfig('POST', itemData);
		const response = await fetch(`${api}/orders/${orderId}/items`, config);
		if (!response.ok) {
			throw new Error('Failed to add order item');
		}
		return response.json();
	},
	getOrderItems: async (orderId) => {
		const config = requestConfig('GET');
		const response = await fetch(`${api}/orders/${orderId}/items`, config);
		if (!response.ok) {
			throw new Error('Failed to fetch order items');
		}
		return response.json();
	},
	removeOrderItem: async (itemId) => {
		const config = requestConfig('DELETE');
		const response = await fetch(`${api}/order_items/${itemId}`, config);
		if (!response.ok) {
			throw new Error('Failed to delete order item');
		}
		return response.json();
	},
};

export default OrderItemsService;
