import React, { useEffect, useState } from 'react';
import './main.css';
import Header from '../../components/Menu/Header';
import Home from './Home';

function Main() {
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:3001/products');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const orderData = async () => {
		try {
			const response = await fetch('http://localhost:3001/orders');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setOrders(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<main>
			<div className='banner'>
				<Header />
				<div className='container-fluid'>
					<Home products={products} orderData={orderData} />
				</div>
			</div>
		</main>
	);
}

export default Main;
