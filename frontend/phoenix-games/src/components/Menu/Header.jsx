import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
	ListItem,
	Box,
} from '@mui/material';
import {
	Search as SearchIcon,
	Home as HomeIcon,
	Person as PersonIcon,
	ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../CartContext';

const Header = () => {
	const { cart } = useCart();
	const itemsCount = Object.keys(cart || {}).length;
	const { logout } = useAuth();
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/login');
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (query) {
			navigate(`search?q=${query}`);
		}
	};

	return (
		<AppBar
			position='static'
			className='header'
			sx={{ background: 'var(--second)', borderRadius: '20px 20px 20px 20px' }}
		>
			<Toolbar
				className='header-toolbar'
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingLeft: '20px',
					paddingRight: '20px',
				}}
			>
				<NavLink to='/'>
					<img
						src='https://p7.hiclipart.com/preview/936/725/264/phoenix-logo-legendary-creature-phoenix.jpg'
						style={{ width: '30px', height: '30px', borderRadius: '15px' }}
					/>
				</NavLink>
				<form
					onSubmit={handleSearch}
					className='header-search'
					style={{ marginRight: 'auto' }}
				>
					<IconButton type='submit' color='inherit' sx={{ color: 'wheat' }}>
						<SearchIcon />
					</IconButton>
					<InputBase
						placeholder='Pesquisar'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						inputProps={{ 'aria-label': 'search' }}
						sx={{ color: 'wheat' }}
					/>
				</form>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ListItem sx={{ padding: 0 }}>
						<NavLink to='/'>
							<IconButton color='inherit' sx={{ color: 'wheat' }}>
								<HomeIcon />
							</IconButton>
						</NavLink>
					</ListItem>
					<ListItem sx={{ padding: 0 }}>
						<NavLink to='/cart'>
							<IconButton color='inherit' sx={{ color: 'wheat' }}>
								<ShoppingCartIcon />
								{itemsCount > 0 && <span>({itemsCount})</span>}
							</IconButton>
						</NavLink>
					</ListItem>
					<ListItem sx={{ padding: 0 }}>
						<NavLink to='/profile'>
							<IconButton color='inherit' sx={{ color: 'wheat' }}>
								<PersonIcon />
							</IconButton>
						</NavLink>
					</ListItem>
					<ListItem sx={{ padding: 0 }}>
						<IconButton
							color='inherit'
							onClick={handleLogout}
							sx={{ color: 'wheat' }}
						>
							<ExitToAppIcon />
						</IconButton>
					</ListItem>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
