import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useCart } from '../CartContext';
import { Grid, Link } from '@mui/material';
import './productCard.css';

const ProductCard = ({ product }) => {
	const { addToCart } = useCart();

	return (
		<Grid item xs={6} sm={4} md={3} lg={2}>
			<div className='card-container'>
				<img src={product.image} alt={`${product.name} capa`} />

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
		</Grid>
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
