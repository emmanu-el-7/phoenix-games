import './profile.css';
import { useEffect, useState } from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Toolbar,
	Button,
	TextField,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import Header from '../../components/Menu/Header';
import customerService from '../../services/customerService';

const Profile = () => {
	const { customer, loading, error } = useAuth();
	const [customerDetails, setCustomerDetails] = useState(null);
	const [editFields, setEditFields] = useState({
		name: '',
		email: '',
		password: '',
		profileImage: '',
	});

	const handleEditProfile = async () => {
		if (customer && customer.id) {
			try {
				const token = customer.token;
				const formData = new FormData();
				formData.append('name', editFields.name || customerDetails.name);
				formData.append('email', editFields.email || customerDetails.email);
				if (editFields.password) {
					formData.append('password', editFields.password);
				}
				if (editFields.profileImage) {
					formData.append('profileImage', editFields.profileImage);
				}
				const edit = await customerService.updateProfile(formData, token);
				console.log(edit);
				setCustomerDetails(edit);
			} catch (err) {
				console.error('Failed to edit profile:', err);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditFields((prevFields) => ({
			...prevFields,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		setEditFields((prevFields) => ({
			...prevFields,
			profileImage: e.target.files[0],
		}));
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
						<TextField
							label='Name'
							name='name'
							value={editFields.name}
							onChange={handleChange}
							sx={{ margin: '1rem 0' }}
						/>
						<TextField
							label='Email'
							name='email'
							value={editFields.email}
							onChange={handleChange}
							sx={{ margin: '1rem 0' }}
						/>
						<TextField
							label='Password'
							type='password'
							name='password'
							value={editFields.password}
							onChange={handleChange}
							sx={{ margin: '1rem 0' }}
						/>
						<TextField
							label='Profile Image URL'
							name='profileImageUrl'
							value={editFields.profileImage}
							onChange={handleChange}
							sx={{ margin: '1rem 0' }}
						/>
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
