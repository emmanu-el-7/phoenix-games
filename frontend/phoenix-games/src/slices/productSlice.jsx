import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../services/productService';

const initialState = {
	products: [],
	error: false,
	success: false,
	loading: false,
	message: null,
};

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		try {
			return await productService.listProducts();
		} catch (error) {
			throw new Error(error.message);
		}
	}
);

export const addProduct = createAsyncThunk(
	'products/addProduct',
	async (data, { getState }) => {
		const { auth } = getState();
		try {
			return await productService.createProduct(data, auth.token);
		} catch (error) {
			throw new Error(error.message);
		}
	}
);

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async (data, { getState }) => {
		const { auth } = getState();
		try {
			return await productService.updateProduct(data.id, data, auth.token);
		} catch (error) {
			throw new Error(error.message);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (id, { getState }) => {
		const { auth } = getState();
		try {
			return await productService.deleteProduct(id, auth.token);
		} catch (error) {
			throw new Error(error.message);
		}
	}
);

export const searchProducts = createAsyncThunk(
	'products/search',
	async (query, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await productService.searchProducts(query, token);

		return data;
	}
);

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(updateProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.products.findIndex(
					(p) => p.id === action.payload.id
				);
				if (index !== -1) {
					state.products[index] = action.payload;
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter(
					(p) => p.id !== action.payload.id
				);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(searchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(searchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default productSlice.reducer;
