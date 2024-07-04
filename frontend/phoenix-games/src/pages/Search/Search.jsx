import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
	Card,
	CardContent,
	Typography,
	Toolbar,
	List,
	ListItem,
	CardMedia,
	IconButton,
} from '@mui/material';
import Header from '../../components/Menu/Header';
import productService from '../../services/productService';
import { useCart } from '../../components/CartContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './search.css';

const Search = () => {
	const { addToCart } = useCart();
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
				setProducts(Array.isArray(data) ? data : []);
			} catch (error) {
				setError('Error searching products. Please try again later.');
				console.error('Error searching products:', error);
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		if (searchQuery) {
			fetchSearchResults();
		}
	}, [searchQuery]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='search-page'>
			<Toolbar>
				<Header />
			</Toolbar>
			<div className='search-results'>
				<Card
					className='product-list'
					sx={{ borderRadius: '8px', background: 'var(--bgColor)' }}
				>
					<CardContent className='card-content'>
						<Typography
							variant='h5'
							component='div'
							sx={{ color: 'wheat', fontFamily: 'Bauhaus Modern' }}
						>
							Resultados da pesquisa
						</Typography>
						<List>
							{products.map((product) => (
								<ListItem
									key={product.id}
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										gap: '20px',
										padding: '20px',
									}}
								>
									<CardMedia
										component='img'
										image={product.image}
										alt={product.name}
										sx={{
											width: 200,
											height: 200,
											objectFit: 'fill',
											borderRadius: '8px',
											marginBottom: '10px',
										}}
									/>
									<CardContent>
										<Typography
											variant='h6'
											component='div'
											sx={{ color: 'wheat', fontFamily: 'Poppins' }}
										>
											{product.name}
										</Typography>
										<Typography
											variant='body1'
											component='div'
											sx={{ color: 'wheat', fontFamily: 'Poppins' }}
										>
											R$ {product.price}
										</Typography>
										<IconButton
											className='bag'
											aria-label='add to cart'
											onClick={() => addToCart(product)}
											sx={{ color: 'wheat' }}
										>
											<AddShoppingCartIcon />
										</IconButton>
									</CardContent>
								</ListItem>
							))}
						</List>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Search;
