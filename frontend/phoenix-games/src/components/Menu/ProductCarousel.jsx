import React from 'react';
import {
	Button,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from '@mui/material';

import Carousel from 'react-material-ui-carousel';
import './productCarousel.css';

const ProductCarousel = ({ products }) => {
	return (
		<Carousel>
			{products.map((product, index) => (
				<Card key={index} className='productSlider'>
					<CardMedia
						component='img'
						image={product.image}
						alt='Product Image'
					/>

					<CardContent className='content'>
						<Typography variant='h5' component='h2'>
							{product.name}
						</Typography>
						<div className='buttons'>
							<Button variant='contained' color='primary' href='/product'>
								Compre já!
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
