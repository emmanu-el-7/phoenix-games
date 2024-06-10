import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
	const [auth, setAuth] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const isLoggedIn = await authService.isLoggedIn();
				setAuth(isLoggedIn);
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
			await authService.login(credentials);
			setAuth(true);
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
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { auth, loading, error, login, logout };
};
