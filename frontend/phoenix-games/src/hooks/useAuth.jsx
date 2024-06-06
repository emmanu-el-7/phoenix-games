/* eslint-disable react/prop-types */
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

	useEffect(() => {
		const checkUserStatus = () => {
			const userData = JSON.parse(localStorage.getItem('user'));
			if (userData) {
				setUser(userData);
			} else {
				setUser(null);
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
				localStorage.setItem('user', JSON.stringify(data.user));
			}
		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await authService.logout();
			setUser(null);
			localStorage.removeItem('user');
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
