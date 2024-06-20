/* eslint-disable react/prop-types */
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
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import Header from '../../components/Menu/Header';
import { useCart } from '../../components/CartContext';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const CartPage = ({ product }) => {
	const { customer, loading, error } = useAuth();
	const [customerDetails, setCustomerDetails] = useState(null);
	const { cart, removeFromCart } = useCart();
	const [order, setOrder] = useState(null);

	const handleRemoveFromCart = async () => {
		if (order) {
			removeFromCart(product, order);
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
				<Card className='cart-card' sx={{ borderRadius: '8px' }}>
					<CardContent className='profile-card'>
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
							{Object.values(cart).map((item) => (
								<ListItem
									key={item.product.id}
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										gap: '20px',
										padding: '20px',
									}}
								>
									<CardMedia
										component='img'
										image={item.product.image}
										alt={item.product.name}
										sx={{
											width: 200,
											height: 200,
											objectFit: 'cover',
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
											{item.product.name}
										</Typography>
										<Typography
											variant='body1'
											component='div'
											sx={{ color: 'wheat', fontFamily: 'Poppins' }}
										>
											R$ {item.product.price}
										</Typography>
										<IconButton
											className='bag'
											aria-label='remove from cart'
											onClick={handleRemoveFromCart}
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
			</div>
		</div>
	);
};

export default CartPage;
