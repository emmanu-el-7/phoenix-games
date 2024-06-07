import React from 'react';
import {
	Button,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import './productCarousel.css';

const ProductCarousel = ({ products }) => {
	return (
		<Carousel>
			{products.map((product, index) => (
				<Card key={product.id} className='productSlider'>
					<CardMedia
						component='img'
						image={product.image}
						alt={`${product.name} Image`}
					/>

					<CardContent className='content'>
						<Typography variant='h5' component='h2' color={'white'}>
							{product.name}
						</Typography>
						<div className='buttons'>
							<Button
								variant='contained'
								color={'secondary'}
								href={`/product/${product.id}`}
								aria-label={`Compre ${product.name}`}
							>
								Compre já!
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</Carousel>
	);
};

ProductCarousel.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default ProductCarousel;
