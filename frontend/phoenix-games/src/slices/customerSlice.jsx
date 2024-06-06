import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from '../services/customerService';

const initialState = {
	customer: {},
	error: false,
	success: false,
	loading: false,
	message: null,
};

export const profile = createAsyncThunk(
	'customer/profile',
	async (customer, thunkAPI) => {
		const token = thunkAPI.getState().auth.customer.token;

		const data = await customerService.profile(customer, token);

		return data;
	}
);

export const updateProfile = createAsyncThunk(
	'customer/update',
	async (customer, thunkAPI) => {
		const token = thunkAPI.getState().auth.customer.token;

		const data = await customerService.updateProfile(customer, token);

		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

export const getcustomerDetails = createAsyncThunk(
	'customer/get',
	async (id, thunkAPI) => {
		const data = await customerService.getcustomerDetails(id);

		return data;
	}
);

export const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		resetMessage: (state) => {
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(profile.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(profile.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.customer = action.payload;
			})
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.customer = action.payload;
				state.message = 'Usuário atualizado com sucesso!';
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.customer = {};
			})
			.addCase(getcustomerDetails.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getcustomerDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.customer = action.payload;
			});
	},
});

export const { resetMessage } = customerSlice.actions;
export default customerSlice.reducer;
