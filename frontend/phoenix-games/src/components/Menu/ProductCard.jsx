import React from 'react';
import { Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import './productCard.css';
import PropTypes from 'prop-types';
import cartService from '../../services/cartService';

const ProductCard = ({ product, customer_id }) => {
	const handleAddToCart = async () => {
		try {
			const response = await cartService.addToCart(customer_id, product.id);
			console.log('Product added to cart:', response);
		} catch (error) {
			console.error('Error adding product to cart:', error);
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
					onClick={handleAddToCart}
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
	customer_id: PropTypes.number.isRequired,
};

export default ProductCard;
