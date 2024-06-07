import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import './productCard.css';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
	return (
		<div className='col-xl-3 col-lg-4 col-md-6'>
			<div className='card-container'>
				<img src={product.image} alt={`${product.name} capa`} />
				<IconButton
					aria-label='add to favorites'
					style={{ color: 'white' }}
					className='favoritesBtn'
				>
					<FavoriteIcon />
				</IconButton>
				<Typography
					variant='body1'
					className='product-name'
					sx={{ color: 'white' }}
				>
					{product.name}
				</Typography>
				<Typography variant='body1' className='product-price'>
					R$ {Number(product.price).toFixed(2)}
				</Typography>
				<IconButton
					className='bag'
					aria-label='add to cart'
					sx={{ color: 'white' }}
				>
					<AddShoppingCartIcon />
				</IconButton>
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
		category: PropTypes.string.isRequired,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
};

export default ProductCard;
