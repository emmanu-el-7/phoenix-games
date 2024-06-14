import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Toolbar, Typography } from '@mui/material';
import Header from '../../components/Menu/Header';
import ProductCard from '../../components/Menu/ProductCard';
import productService from '../../services/productService';
import './search.css';

const Search = () => {
	const location = useLocation();
	const searchQuery = new URLSearchParams(location.search).get('q');
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSearchResults = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await productService.searchProducts(searchQuery);
				setProducts(data);
			} catch (error) {
				setError('Error searching products. Please try again later.');
				console.error('Error searching products:', error);
			} finally {
				setLoading(false);
			}
		};

		if (searchQuery) {
			fetchSearchResults();
		}
	}, [searchQuery]);

	return (
		<div className='search-page'>
			<Toolbar>
				<Header />
			</Toolbar>
			<div className='search-results'>
				<Card sx={{ background: 'var(--bgColor)' }}>
					<Typography variant='p' sx={{ color: 'wheat' }}>
						Search Results for &quot;{searchQuery}&quot;
						{loading && <div>Loading...</div>}
						{error && <div>Error: {error}</div>}
					</Typography>
				</Card>
				<Card className='product-list' sx={{ background: 'var(--bgColor)' }}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Card>
			</div>
		</div>
	);
};

export default Search;
