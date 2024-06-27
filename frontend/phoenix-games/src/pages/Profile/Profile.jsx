import './profile.css';
import { useEffect, useState } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Toolbar,
	Button,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import Header from '../../components/Menu/Header';
import customerService from '../../services/customerService';

const Profile = () => {
	const { customer, loading, error } = useAuth();
	const [customerDetails, setCustomerDetails] = useState(null);

	const handleEditProfile = async () => {
		if (customer && customer.id) {
			try {
				const token = customer.token;
				const edit = await customerService.updateProfile(
					{ name: 'updated name' },
					token
				);
				console.log(edit);
				setCustomerDetails((prevDetails) => ({
					...prevDetails,
					name: 'updated name',
				}));
			} catch (err) {
				console.error('Failed to edit profile:', err);
			}
		}
	};

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
					<CardContent className='card-content'>
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
						<Button
							variant='contained'
							color='primary'
							onClick={handleEditProfile}
							sx={{ margin: '1rem' }}
						>
							Edit Profile
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Profile;
