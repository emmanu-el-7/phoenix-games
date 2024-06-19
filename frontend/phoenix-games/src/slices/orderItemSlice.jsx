import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderItemService from '../services/OrderItemService';

export const fetchOrderItems = createAsyncThunk(
	'orderItems/fetchOrderItems',
	async (orderId) => {
		return await OrderItemService.getOrderItems(orderId);
	}
);

export const addOrderItem = createAsyncThunk(
	'orderItems/addOrderItem',
	async ({ orderId, itemData }) => {
		return await OrderItemService.addOrderItem(orderId, itemData);
	}
);

export const removeOrderItem = createAsyncThunk(
	'orderItems/removeOrderItem',
	async (itemId) => {
		return await OrderItemService.removeOrderItem(itemId);
	}
);

const orderItemsSlice = createSlice({
	name: 'orderItems',
	initialState: {
		orderItems: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrderItems.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchOrderItems.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orderItems = action.payload;
			})
			.addCase(fetchOrderItems.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addOrderItem.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addOrderItem.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orderItems.push(action.payload);
			})
			.addCase(addOrderItem.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(removeOrderItem.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(removeOrderItem.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orderItems = state.orderItems.filter(
					(item) => item.id !== action.payload.id
				);
			})
			.addCase(removeOrderItem.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default orderItemsSlice.reducer;
