import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		const checkUserStatus = async () => {
			const userData = JSON.parse(localStorage.getItem('user'));
			if (userData) {
				setAuth(true);
			} else {
				setAuth(false);
			}
			setLoading(false);
		};

		checkUserStatus();
	}, []);

	const login = async (credentials) => {
		setLoading(true);
		try {
			const data = await authService.login(credentials);
			if (data.user) {
				setUser(data.user);
				setAuth(true);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await authService.logout();
			setUser(null);
			setAuth(false);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
