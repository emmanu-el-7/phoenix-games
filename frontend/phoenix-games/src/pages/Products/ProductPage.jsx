/* eslint-disable react/prop-types */
import './productPage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productService from '../../services/productService';
import {
	Button,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
	Toolbar,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Header from '../../components/Menu/Header';
import { useCart } from '../../components/CartContext';

const ProductPage = () => {
	const { addToCart } = useCart();
	const { id } = useParams();
	const [showTrailer, setShowTrailer] = useState(false);
	const [product, setProduct] = useState(null);

	const toggleTrailer = () => {
		setShowTrailer((prevShowTrailer) => !prevShowTrailer);
	};

	useEffect(() => {
		const getProduct = async () => {
			try {
				const productData = await productService.getProductDetails(id);
				setProduct(productData);
			} catch (error) {
				console.error(`Error fetching product ${id}:`, error);
			}
		};

		getProduct();
	}, [id]);

	if (!product) {
		return <div>Loading...</div>;
	}

	const backgroundImageStyle = {
		backgroundImage: `url(${product.bgimage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div style={backgroundImageStyle}>
			<Toolbar>
				<Header />
			</Toolbar>
			<div
				className='product-page'
				style={{ paddingBottom: '3rem', padding: '1rem' }}
			>
				<Grid item xs={12} sm={8} md={6}>
					<Card
						className='product-card'
						sx={{ borderRadius: '8px', marginTop: '6rem' }}
					>
						{!showTrailer ? (
							<CardMedia
								component='img'
								image={product.image}
								alt={`${product.name} capa`}
								className='product-image'
								sx={{ borderRadius: '8px 8px 0 0', objectFit: 'fill' }}
							/>
						) : (
							<div className='product-trailer'>
								<iframe
									title='Product Trailer'
									src={product.trailer}
									frameBorder='0'
									allowFullScreen
								></iframe>
							</div>
						)}
						<CardContent className='card-content'>
							<Button
								onClick={toggleTrailer}
								className='play-button'
								sx={{
									color: 'wheat',
									backgroundColor: 'var(--second)',
									'&:hover': {
										backgroundColor: 'var(--primary)',
										transition: '0.6s ease',
									},
								}}
							>
								{showTrailer ? 'Hide Trailer' : 'Play Trailer'}
							</Button>
							<Typography
								variant='h5'
								component='div'
								sx={{ color: 'wheat', fontFamily: 'Bauhaus Modern' }}
							>
								{product.name}
							</Typography>
							<div className='product-infos'>
								<Typography
									variant='h6'
									sx={{ color: 'wheat', fontFamily: 'Poppins' }}
								>
									R$ {Number(product.price).toFixed(2)}
								</Typography>
								<Typography
									variant='h8'
									component='div'
									sx={{ color: 'wheat', fontFamily: 'Poppins' }}
								>
									Metacritic: {product.rating}
								</Typography>
							</div>
							<div className='product-actions'>
								<IconButton
									aria-label='add to cart'
									className='cartBtn'
									sx={{ color: 'var(--primary)' }}
									onClick={() => addToCart(product)}
								>
									<AddShoppingCartIcon />
								</IconButton>
							</div>
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{ color: 'wheat', fontFamily: 'Poppins' }}
							>
								{product.description}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</div>
		</div>
	);
};

export default ProductPage;
