import React, { useEffect, useState } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Toolbar,
	Grid,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Menu/Header';
import customerService from '../../services/customerService';
import { Description } from '@mui/icons-material';

const FavsPage = () => {
	const { customer, loading, error } = useAuth();
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const fetchCustomerDetails = async () => {
			if (customer && customer.id) {
				try {
					const favoriteProducts = await customerService.getCustomerFavorites(
						customer.id
					);

					if (Array.isArray(favoriteProducts)) {
						setFavorites(favoriteProducts);
					} else {
						console.error(
							'Favorite products is not an array:',
							favoriteProducts
						);
					}
				} catch (err) {
					console.error('Failed to fetch customer details:', err);
				}
			}
		};

		fetchCustomerDetails();
	}, [customer]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	console.log('Favorites:', favorites);

	const backgroundImageStyle = {
		backgroundImage:
			'url(https://images6.alphacoders.com/123/thumb-1920-1233938.jpg)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div className='favs-page' style={backgroundImageStyle}>
			<Toolbar>
				<Header />
			</Toolbar>
			<Grid container spacing={3}>
				{favorites.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Card className='product-card' sx={{ borderRadius: '8px' }}>
							<CardMedia
								component='img'
								image={product.image}
								alt={`${product.name} image`}
								sx={{ borderRadius: '8px 8px 0 0' }}
							/>
							<CardContent>
								<Typography
									variant='body1'
									component='div'
									sx={{ color: 'wheat', fontFamily: 'Bauhaus Modern' }}
								>
									{product.name}
								</Typography>
								<Typography
									variant='body2'
									component='div'
									sx={{ color: 'wheat', fontFamily: 'Poppins' }}
								>
									R$ {product.description}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default FavsPage;
