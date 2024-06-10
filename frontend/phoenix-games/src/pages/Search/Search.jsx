import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/Menu/ProductCard';
import './search.css';

const Search = () => {
	const location = useLocation();
	const search = new URLSearchParams(location.search).get('q');
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSearchResults = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/products/search?q=${search}`);
				if (!res.ok) {
					throw new Error(`Error: ${res.status}`);
				}
				const data = await res.json();
				setProducts(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (search) {
			fetchSearchResults();
		}
	}, [search]);

	return (
		<div className='search-results'>
			<h2>Search Results for &quot;{search}&quot;</h2>
			{loading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}
			<div className='product-list'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Search;
