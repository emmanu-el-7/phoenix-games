import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Main from './pages/Home/Main';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import './App.css';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ProductPage from './pages/Products/ProductPage';
import Search from './pages/Search/Search';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error('Error caught by ErrorBoundary:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <div>Something went wrong.</div>;
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
};

function App() {
	const { auth, loading } = useAuth();

	if (loading) {
		return <p>Carregando aplicação...</p>;
	}

	return (
		<ErrorBoundary>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='/search' element={<Search />} />
				</Routes>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
