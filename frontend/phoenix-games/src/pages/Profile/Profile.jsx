import './profile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	Button,
	Card,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
	Toolbar,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import Header from '../../components/Menu/Header';

const Profile = () => {
	const { customer, loading, error } = useAuth();
	const [customerDetails, setCustomerDetails] = useState(null);

	useEffect(() => {
		const fetchCustomerDetails = async () => {
			if (customer && customer.id) {
				try {
					const customerData = await authService.getCustomerDetails(
						customer.id
					);
					setCustomerDetails(customerData);
				} catch (err) {
					console.error('Failed to fetch customer details:', err);
				}
			}
		};

		fetchCustomerDetails();
	}, [customer]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const backgroundImageStyle = {
		backgroundImage:
			'url(https://images6.alphacoders.com/123/thumb-1920-1233938.jpg)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div style={backgroundImageStyle}>
			<Toolbar>
				<Header />
			</Toolbar>
			<div className='profile-page'>
				<Card
					className='profile-card'
					sx={{ borderRadius: '8px', marginBottom: '1rem' }}
				>
					<CardMedia
						component='img'
						image={customerDetails?.profile_image || 'default_image_url'}
						alt={
							customerDetails?.profile_image
								? `${customerDetails.profile_image} pfp`
								: 'Profile Picture'
						}
						className='profile-image'
						sx={{ borderRadius: '8px 8px 0 0' }}
					/>
					<CardContent className='profile-card'>
						<Typography
							variant='h5'
							component='div'
							sx={{ color: 'wheat', fontFamily: 'Bauhaus Modern' }}
						>
							{customerDetails?.name || 'Name not available'}
						</Typography>
						<Typography
							variant='h6'
							component='div'
							sx={{ color: 'wheat', fontFamily: 'Poppins' }}
						>
							{customerDetails?.email || 'Email not available'}
						</Typography>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Profile;
