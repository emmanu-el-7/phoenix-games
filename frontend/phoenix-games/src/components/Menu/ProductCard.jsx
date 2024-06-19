import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'; // Importando o ícone de remover do carrinho
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import OrderItemsService from '../../services/orderItemService';
import { useCart } from '../CartContext';
import { useAuth } from '../../hooks/useAuth';
import { api, requestConfig } from '../../utils/config';

const ProductCard = ({ product }) => {
	const { addToCart, removeFromCart } = useCart();
	const { customer } = useAuth();
	const [order, setOrder] = useState(null);

	const createOrder = async () => {
		try {
			const data = { customer_id: customer.id };
			const config = requestConfig('POST', data);

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

	const handleAddToCart = async () => {
		if (!order) {
			const newOrder = await createOrder();
			setOrder(newOrder);
			addToCart(product, newOrder);
		} else {
			addToCart(product, order);
		}
	};

	const handleRemoveFromCart = async () => {
		if (order) {
			removeFromCart(product, order);
		}
	};

	return (
		<div className='col-xl-3 col-lg-4 col-md-6'>
			<div className='card-container'>
				<img src={product.image} alt={`${product.name} capa`} />
				<IconButton aria-label='add to favorites' className='favoritesBtn'>
					<FavoriteIcon />
				</IconButton>
				<Typography variant='body1' className='product-name' component='a'>
					{product.name}
				</Typography>
				<Typography variant='body1' className='product-price'>
					R$ {Number(product.price).toFixed(2)}
				</Typography>
				<IconButton
					className='bag'
					aria-label='add to cart'
					onClick={handleAddToCart}
				>
					<AddShoppingCartIcon />
				</IconButton>
				<IconButton
					className='bag'
					aria-label='remove from cart'
					onClick={handleRemoveFromCart}
				>
					<RemoveShoppingCartIcon />
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
