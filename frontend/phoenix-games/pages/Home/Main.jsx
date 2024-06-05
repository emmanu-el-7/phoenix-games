import React, { useEffect, useState } from 'react';
import './main.css';
import SideMenu from '../../components/Menu/SideMenu';
import Header from '../../components/Menu/Header';
import Home from './Home';

function Main() {
	const [active, setActive] = useState(false);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleToggleActive = () => {
		setActive((prevActive) => !prevActive);
	};

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
			<SideMenu active={active} />
			<div className={`banner ${active ? 'active' : ''}`}>
				<Header toggleActive={handleToggleActive} />
				<div className='container-fluid'>
					<Home products={products} />
				</div>
			</div>
		</main>
	);
}

export default Main;
