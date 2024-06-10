import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { stringify, parse } from 'flatted';
import authService from '../services/authService';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [customer, setCustomer] = useState(() => {
		const storedCustomer = localStorage.getItem('customer');
		if (storedCustomer) {
			try {
				return parse(storedCustomer);
			} catch (e) {
				console.error('Failed to parse customer from localStorage', e);
				return null;
			}
		}
		return null;
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		try {
			localStorage.setItem('customer', stringify(customer));
		} catch (e) {
			console.error('Failed to stringify customer for localStorage', e);
		}
	}, [customer]);

	const register = useCallback(async (customerData) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.register(customerData);
			if (!data.errors) {
				setCustomer(data);
			}
		} catch (err) {
			console.error(err);
			setError(err.message || 'Registration failed');
		} finally {
			setLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			await authService.logout();
			setCustomer(null);
			localStorage.removeItem('customer');
		} catch (err) {
			console.error(err);
			setError(err.message || 'Logout failed');
		} finally {
			setLoading(false);
		}
	}, []);

	const login = useCallback(async (customerData) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.login(customerData);
			if (!data.errors) {
				setCustomer(data);
			}
		} catch (err) {
			console.error(err);
			setError(err.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ customer, loading, error, register, logout, login }}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthProvider;
