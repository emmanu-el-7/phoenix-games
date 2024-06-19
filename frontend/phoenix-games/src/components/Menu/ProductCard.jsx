import React, { useState } from 'react';
import { Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import './productCard.css';
import PropTypes from 'prop-types';
import OrderItemsService from '../../services/orderItemService';
import { api, requestConfig } from '../../utils/config';
import { useAuth } from '../../hooks/useAuth';

const ProductCard = ({ product }) => {
	const [orders, setOrders] = useState([]);
	const { customer } = useAuth();

	const createOrder = async (orderData) => {
		try {
			const data = { ...orderData, customer };
			console.log('Order Payload:', data);
			const config = requestConfig('POST', data);
			console.log('Request Config:', config);

			const response = await fetch(`${api}/orders`, config);
			if (!response.ok) {
				throw new Error('Failed to create order');
			}
			return response.json();
		} catch (error) {
			console.error('Failed to create order:', error);
			throw error;
		}
	};

	const handleAddToCart = async (product, orders) => {
		try {
			let order_id;

			if (!orders || orders.length === 0) {
				const newOrder = await createOrder({});
				order_id = newOrder.id;
				setOrders([newOrder]);
			} else {
				order_id = orders[0].id;
			}

			const itemData = { product_id: product.id, quantity: 1 };
			await OrderItemsService.addOrderItem(order_id, itemData);
		} catch (error) {
			console.error('Failed to add item to cart:', error);
		}
	};

	return (
		<div className='col-xl-3 col-lg-4 col-md-6'>
			<div className='card-container'>
				<img src={product.image} alt={`${product.name} capa`} />
				<IconButton
					aria-label='add to favorites'
					style={{ color: 'wheat' }}
					className='favoritesBtn'
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
					sx={{ color: 'wheat' }}
					onClick={() => handleAddToCart(product, orders)}
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
