import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../services/OrderService';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
	return await OrderService.getAllOrders();
});

export const fetchOrderById = createAsyncThunk(
	'orders/fetchOrderById',
	async (id) => {
		return await OrderService.getOrderById(id);
	}
);

export const createOrder = createAsyncThunk(
	'orders/createOrder',
	async (orderData) => {
		return await OrderService.createOrder(orderData);
	}
);

export const updateOrder = createAsyncThunk(
	'orders/updateOrder',
	async ({ id, orderData }) => {
		return await OrderService.updateOrder(id, orderData);
	}
);

export const deleteOrder = createAsyncThunk(
	'orders/deleteOrder',
	async (id) => {
		return await OrderService.deleteOrder(id);
	}
);

export const checkout = createAsyncThunk(
	'orders/checkout',
	async (checkoutData) => {
		return await OrderService.checkout(checkoutData);
	}
);

const orderSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: [],
		order: null,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrders.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orders = action.payload;
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchOrderById.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchOrderById.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.order = action.payload;
			})
			.addCase(fetchOrderById.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createOrder.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orders.push(action.payload);
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateOrder.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const index = state.orders.findIndex(
					(order) => order.id === action.payload.id
				);
				state.orders[index] = action.payload;
			})
			.addCase(updateOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(deleteOrder.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orders = state.orders.filter(
					(order) => order.id !== action.payload.id
				);
			})
			.addCase(deleteOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(checkout.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(checkout.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orders.push(action.payload);
			})
			.addCase(checkout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default orderSlice.reducer;
