import React, { useState } from 'react';
import { Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useCart } from '../CartContext';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../utils/config';
import './productCard.css';

const ProductCard = ({ product }) => {
	const { addToCart } = useCart();
	const { customer } = useAuth();
	const [order, setOrder] = useState(null);

	const createOrder = async () => {
		try {
			if (!customer || !customer.id) {
				throw new Error('Customer ID is missing or invalid');
			}

			const data = { customer_id: customer.id };
			const config = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			};

			const response = await fetch(`${api}/orders`, config);
			if (!response.ok) {
				throw new Error('Failed to create order');
			}

			const newOrder = await response.json();
			if (!newOrder || !newOrder.order_id) {
				throw new Error('Order ID is missing in the response');
			}

			return newOrder;
		} catch (error) {
			console.error('Failed to create order:', error.message);
			throw error;
		}
	};

	const handleAddToCart = async () => {
		try {
			if (!order) {
				const newOrder = await createOrder();
				setOrder(newOrder);
				console.log('New Order ID:', newOrder.order.id);
				addToCart(product, newOrder.order.id);
			} else {
				addToCart(product, order.order.id);
			}
		} catch (error) {
			console.error('Failed to add item to cart:', error.message);
		}
	};

	return (
		<div className='col-xl-3 col-lg-4 col-md-6'>
			<div className='card-container'>
				<img src={product.image} alt={`${product.name} capa`} />
				<IconButton
					aria-label='add to favorites'
					className='favoritesBtn'
					style={{ color: 'wheat' }}
				>
					<FavoriteIcon />
				</IconButton>
				<Link
					href={`/product/${product.id}`}
					aria-label={`Compre ${product.name}`}
					sx={{ textDecoration: 'none' }}
				>
					<Typography
						variant='body1'
						className='product-name'
						sx={{
							color: 'wheat',
							textDecoration: 'none',
						}}
						component='a'
						href={`/product/${product.id}`}
						aria-label={`Compre ${product.name}`}
					>
						{product.name}
					</Typography>
				</Link>
				<Typography
					variant='body1'
					className='product-price'
					sx={{ color: 'wheat' }}
				>
					R$ {Number(product.price).toFixed(2)}
				</Typography>
				<IconButton
					className='bag'
					aria-label='add to cart'
					onClick={() => addToCart(product)}
					sx={{ color: 'wheat' }}
				>
					<AddShoppingCartIcon />
				</IconButton>
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}).isRequired,
};

export default ProductCard;
