import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
	const [auth, setAuth] = useState(false);
	const [customer, setCustomer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const token = localStorage.getItem('token');
				if (token) {
					const decodedToken = parseJwt(token);
					if (decodedToken) {
						setAuth(true);
						setCustomer(decodedToken);
					}
				} else {
					const isLoggedIn = await authService.isLoggedIn();
					setAuth(isLoggedIn);
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const login = async (credentials) => {
		setLoading(true);
		try {
			const responseData = await authService.login(credentials);
			setAuth(true);
			const decodedToken = parseJwt(responseData.token);
			setCustomer(decodedToken);
			localStorage.setItem('customer', JSON.stringify(responseData));
			localStorage.setItem('token', responseData.token);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await authService.logout();
			setAuth(false);
			setCustomer(null);
			localStorage.removeItem('token');
			localStorage.removeItem('customer');
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { auth, customer, loading, error, login, logout };
};

const parseJwt = (token) => {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);

		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error('Error parsing JWT:', error);
		return null;
	}
};
