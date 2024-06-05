import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [customer, setCustomer] = useState(
		JSON.parse(localStorage.getItem('customer')) || null
	);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		localStorage.setItem('customer', JSON.stringify(customer));
	}, [customer]);

	const register = async (customerData) => {
		setLoading(true);
		setError(false);
		try {
			const data = await authService.register(customerData);
			if (!data.errors) {
				setCustomer(data);
				setSuccess(true);
				setLoading(false);
			}
		} catch (err) {
			console.error(err);
			setLoading(false);
			setError(true);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await authService.logout();
			setCustomer(null);
			setSuccess(true);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
			setError(true);
		}
	};

	const login = async (customerData) => {
		setLoading(true);
		setError(false);
		try {
			const data = await authService.login(customerData);
			if (!data.errors) {
				setCustomer(data);
				setSuccess(true);
				setLoading(false);
			}
		} catch (err) {
			console.error(err);
			setLoading(false);
			setError(true);
		}
	};

	return (
		<AuthContext.Provider
			value={{ customer, loading, error, success, register, logout, login }}
		>
			{children}
		</AuthContext.Provider>
	);
};
