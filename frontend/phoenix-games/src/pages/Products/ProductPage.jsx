import './productPage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productService from '../../services/productService';
import {
	Button,
	Card,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductPage = () => {
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
		<div>
			<div className='product-page' style={backgroundImageStyle}>
				<Card className='product-card'>
					{!showTrailer ? (
						<CardMedia
							component='img'
							image={product.image}
							alt={`${product.name} capa`}
							className='product-image'
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
					<CardContent className='product-card'>
						<Button
							onClick={toggleTrailer}
							className='play-button'
							sx={{ color: 'aqua', background: 'var(--second)' }}
						>
							{showTrailer ? 'Hide Trailer' : 'Play Trailer'}
						</Button>
						<Typography
							variant='h5'
							component='div'
							sx={{ color: 'white', fontFamily: 'Bauhaus Modern' }}
						>
							{product.name}
						</Typography>
						<div className='product-infos'>
							<Typography
								variant='h6'
								sx={{ color: 'white', fontFamily: 'Poppins' }}
							>
								R$ {Number(product.price).toFixed(2)}
							</Typography>
							<Typography
								variant='h7'
								sx={{ color: 'white', fontFamily: 'Poppins' }}
							>
								Categorias: {product.category}
							</Typography>
							<Typography
								variant='h8'
								component='div'
								sx={{ color: 'white', fontFamily: 'Poppins' }}
							>
								Metacritic: {product.rating}
							</Typography>
						</div>
						<div className='product-actions'>
							<IconButton
								aria-label='add to favorites'
								className='favoriteBtn'
								sx={{ color: 'var(--primary)' }}
							>
								<FavoriteIcon />
							</IconButton>
							<IconButton
								aria-label='add to cart'
								className='cartBtn'
								sx={{ color: 'var(--primary)' }}
							>
								<AddShoppingCartIcon />
							</IconButton>
						</div>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ color: 'white', fontFamily: 'Poppins' }}
						>
							{product.description}
						</Typography>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ProductPage;
