import './cartPage.css';
import React, { useEffect, useState } from 'react';
import cartService from '../../services/cartService';
import { Button, Card, IconButton, Typography, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Menu/Header';

const CartPage = () => {
	const { customer, loading, error } = useAuth();
	const [cartItems, setCartItems] = useState([]);
	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		const fetchCartItems = async () => {
			if (customer && customer.customer_id) {
				try {
					const items = await cartService.showCart(customer.customer_id);
					if (Array.isArray(items)) {
						setCartItems(items);
					} else {
						setFetchError('Invalid data returned from server.');
					}
				} catch (error) {
					console.error('Error fetching cart items:', error);
					setFetchError('Failed to load cart items. Please try again later.');
				}
			}
		};

		fetchCartItems();
	}, [customer]);

	const handleRemoveFromCart = async (product_id) => {
		try {
			await cartService.removeFromCart(customer.customer_id, product_id);
			setCartItems(cartItems.filter((item) => item.id !== product_id));
		} catch (error) {
			console.error('Error removing item from cart:', error);
			setFetchError('Failed to remove item from cart. Please try again later.');
		}
	};

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
				<Card
					className='cart-card'
					sx={{
						borderRadius: '8px',
						marginTop: '6rem',
						background: 'var(--bgColor)',
					}}
				>
					<Typography
						variant='h4'
						component='h1'
						gutterBottom
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							color: 'wheat',
						}}
					>
						Seu carrinho
					</Typography>
					{fetchError && (
						<Typography
							color='error'
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{fetchError}
						</Typography>
					)}
					{cartItems.length === 0 ? (
						<Typography
							variant='body1'
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color: 'wheat',
							}}
						>
							Seu carrinho está vazio. Vamos às compras?
						</Typography>
					) : (
						<div>
							{cartItems.map((item) => (
								<div
									key={item.id}
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '10px',
									}}
								>
									<img
										src={item.image}
										alt={item.name}
										style={{ width: '50px', marginRight: '10px' }}
									/>
									<Typography variant='body1' style={{ flex: 1 }}>
										{item.name}
									</Typography>
									<Typography variant='body1'>
										R$ {Number(item.price).toFixed(2)}
									</Typography>
									<IconButton
										onClick={() => handleRemoveFromCart(item.id)}
										aria-label='delete'
									>
										<DeleteIcon />
									</IconButton>
								</div>
							))}
						</div>
					)}
					<Button
						variant='contained'
						color='primary'
						sx={{
							marginTop: '20px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '200px',
							margin: '0 auto',
							color: 'wheat',
							backgroundColor: 'var(--second)',
							'&:hover': {
								backgroundColor: 'var(--primary)',
								transition: '0.6s ease',
							},
						}}
					>
						Finalizar pedido
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default CartPage;
