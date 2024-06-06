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
		<div className='card-container'>
			<CardMedia className='product-media' title={product.name}>
				<img src={product.image} />
			</CardMedia>
			<CardContent className='product-feature'>
				<div className='product-title-wrapper'>
					<Typography variant='h6' className='product-name'>
						{product.name}
					</Typography>
					<Typography variant='body1' className='product-price'>
						{product.price}
					</Typography>
				</div>
			</CardContent>
			<div className='bag'>
				<IconButton aria-label='add to cart' style={{ color: 'white' }}>
					<AddShoppingCartIcon />
				</IconButton>
				<IconButton aria-label='add to favorites' style={{ color: 'white' }}>
					<FavoriteIcon />
				</IconButton>
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
};

export default ProductCard;
