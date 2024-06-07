/* eslint-disable react/prop-types */
import React from 'react';
import './home.css';
import ProductsContainer from '../../components/Menu/ProductsContainer';
import ProductCard from '../../components/Menu/ProductCard';

const Home = ({ products }) => {
	return (
		<section id='home' className='home active'>
			<div className='container-fluid'>
				<div className='row'>
					<ProductsContainer />
				</div>
				<div className='row'>
					<div className='col-lg-6 justify-content-start'>
						<h2 className='sectionTitle'>Top Rated</h2>
					</div>
					<div className='cards-grid'>
						{products
							.sort((a, b) => b.rating - a.rating)
							.slice(0, 4)
							.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
