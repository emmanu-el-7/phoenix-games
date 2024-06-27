/* eslint-disable react/prop-types */
import React from 'react';
import './home.css';
import ProductsContainer from '../../components/Menu/ProductsContainer';
import ProductCard from '../../components/Menu/ProductCard';
import { Grid } from '@mui/material';

const Home = ({ products, orderData }) => {
	return (
		<section id='home' className='home active'>
			<div className='container-fluid'>
				<div className='row'>
					<ProductsContainer />
				</div>
				<div className='row'>
					<div className='top-rated'>
						<h2 className='sectionTitle'>Top Rated</h2>
						<Grid
							className='cards-grid'
							direction={{ xs: 'column', sm: 'row' }}
							spacing={{ xs: 1, sm: 2, md: 4 }}
						>
							{products
								.sort((a, b) => b.rating - a.rating)
								.slice(0, 5)
								.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
										order={orderData}
									/>
								))}
						</Grid>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
