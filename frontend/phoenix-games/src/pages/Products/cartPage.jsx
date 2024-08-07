import './cartPage.css';
import { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	Toolbar,
	List,
	ListItem,
	CardMedia,
	Grid,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import Header from '../../components/Menu/Header';
import { useCart } from '../../components/CartContext';
import PropTypes from 'prop-types';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const CartPage = ({ product }) => {
	const { customer, loading, error } = useAuth();
	const [setCustomerDetails] = useState(null);
	const { cart, removeFromCart } = useCart();
	const [order] = useState(null);

	const handleRemoveFromCart = async (product) => {
		if (order) {
			removeFromCart(product);
		}
	};

	useEffect(() => {
		const fetchCustomerDetails = async () => {
			if (customer && customer.id) {
				try {
					const customerData = await authService.getCustomerDetails(
						customer.id
					);
					setCustomerDetails(customerData);
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
		return <div>Error: {error}</div>;
	}

	const backgroundImageStyle = {
		backgroundImage:
			'url(https://images6.alphacoders.com/123/thumb-1920-1233938.jpg)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div style={backgroundImageStyle}>
			<Toolbar>
				<Header />
			</Toolbar>
			<div className='cart-page'>
				<Grid item xs={12} sm={8} md={6}>
					<Card className='cart-card' sx={{ borderRadius: '8px' }}>
						<CardContent className='card-content'>
							<Typography
								variant='h5'
								component='div'
								sx={{
									color: 'wheat',
									fontFamily: 'Bauhaus Modern',
								}}
							>
								Seu Carrinho
							</Typography>
							<List>
								{cart.map((item) => (
									<ListItem
										key={item.id}
										sx={{
											display: 'flex',
											alignItems: 'flex-start',
											gap: '20px',
											padding: '20px',
										}}
									>
										<CardMedia
											component='img'
											image={item.image}
											alt={item.name}
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
												{item.name}
											</Typography>
											<Typography
												variant='body1'
												component='div'
												sx={{ color: 'wheat', fontFamily: 'Poppins' }}
											>
												R$ {item.price}
											</Typography>
											<IconButton
												className='bag'
												aria-label='remove from cart'
												onClick={() => handleRemoveFromCart(item)}
												sx={{ color: 'wheat' }}
											>
												<RemoveShoppingCartIcon />
											</IconButton>
										</CardContent>
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Grid>
			</div>
		</div>
	);
};

CartPage.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}).isRequired,
};

export default CartPage;
