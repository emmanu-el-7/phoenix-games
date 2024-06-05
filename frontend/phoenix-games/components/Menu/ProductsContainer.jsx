import React, { useEffect, useState } from 'react';
import ProductCarousel from './ProductCarousel';
import productService from '../../services/productService';

const ProductsContainer = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const productsArray = await productService.listProducts();
				setProducts(productsArray);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<ProductCarousel products={products} />
		</div>
	);
};

export default ProductsContainer;
