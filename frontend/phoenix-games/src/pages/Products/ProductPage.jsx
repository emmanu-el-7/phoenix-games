import './productPage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productService from '../../services/productService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import SideMenu from '../../components/Menu/SideMenu';
import Header from '../../components/Menu/Header';

const ProductPage = () => {
	const [active, setActive] = useState(false);

	const handleToggleActive = () => {
		setActive((prevActive) => !prevActive);
	};

	const { id } = useParams();
	const [product, setProduct] = useState(null);

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
					<CardMedia
						component='img'
						image={product.image}
						alt={`${product.name} capa`}
						className='product-image'
					/>
					<CardContent className='product-card'>
						<Typography variant='h5' component='div' sx={{ color: 'white' }}>
							{product.name}
						</Typography>
						<Typography
							variant='h6'
							color='text.primary'
							sx={{ color: 'white' }}
						>
							R$ {Number(product.price).toFixed(2)}
						</Typography>
						<div className='product-actions'>
							<IconButton aria-label='add to favorites' className='favoriteBtn'>
								<FavoriteIcon />
							</IconButton>
							<IconButton aria-label='add to cart' className='cartBtn'>
								<AddShoppingCartIcon />
							</IconButton>
						</div>
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{ color: 'white' }}
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
