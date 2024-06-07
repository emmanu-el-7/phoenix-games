/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Avatar,
	Toolbar,
	IconButton,
	InputBase,
	Typography,
	Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from '@mui/material/Link';
import './header.css';
import customerService from '../../services/customerService';

const Header = ({ toggleActive }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [customer, setCustomer] = useState(null);

	useEffect(() => {
		const fetchCustomerDetails = async () => {
			try {
				const data = await customerService.getCustomerDetails();
				setCustomer(data);
			} catch (error) {
				console.error('Failed to fetch customer details:', error);
			}
		};

		fetchCustomerDetails();
	}, []);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<AppBar position='static' className='header-container'>
			<Toolbar className='toolbar'>
				<IconButton
					edge='start'
					color='inherit'
					aria-label='menu'
					onClick={toggleActive}
				>
					<MenuIcon />
				</IconButton>
				<div className='search-container'>
					<IconButton type='button' color='inherit'>
						<SearchIcon />
					</IconButton>
					<InputBase
						className='search-placeholder'
						placeholder='Pesquisar'
						value={searchTerm}
						onChange={handleSearchChange}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>
				<div className='user-area'>
					<IconButton color='inherit'>
						<FavoriteBorderIcon />
					</IconButton>
					<Badge badgeContent={0} color='secondary'>
						<ShoppingCartIcon />
					</Badge>
				</div>
				<div className='user-info'>
					{customer && (
						<>
							<Avatar alt={customer.name} src={customer.image} />
							<Typography variant='body2' className='username'>
								{customer.name}
							</Typography>
							<Typography variant='body2' className='view-profile'>
								<Link sx={{ color: 'white' }} href='/profile'>
									Ver Perfil
								</Link>
							</Typography>
						</>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
