/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
	List,
	ListItem,
} from '@mui/material';
import {
	Search as SearchIcon,
	Home as HomeIcon,
	Person as PersonIcon,
	ExitToApp as ExitToAppIcon,
	Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ toggleActive }) => {
	const { auth, logout } = useAuth();
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
				sx={{ justifyContent: 'space-between' }}
			>
				<IconButton
					edge='start'
					color='inherit'
					aria-label='menu'
					onClick={toggleActive}
				>
					<MenuIcon />
				</IconButton>
				<form onSubmit={handleSearch} className='header-search'>
					<IconButton type='submit' color='inherit'>
						<SearchIcon />
					</IconButton>
					<InputBase
						placeholder='Pesquisar'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						inputProps={{ 'aria-label': 'search' }}
						sx={{ color: 'white' }}
					/>
				</form>
				<List
					className='header-links'
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginLeft: 'auto',
					}}
				>
					<ListItem sx={{ padding: 0 }}>
						<NavLink to='/'>
							<IconButton color='inherit' sx={{ color: 'white' }}>
								<HomeIcon />
							</IconButton>
						</NavLink>
					</ListItem>
					<ListItem sx={{ padding: 0 }}>
						<NavLink to='/profile'>
							<IconButton color='inherit' sx={{ color: 'white' }}>
								<PersonIcon />
							</IconButton>
						</NavLink>
					</ListItem>
					<ListItem sx={{ padding: 0 }}>
						<IconButton color='inherit' onClick={handleLogout}>
							<ExitToAppIcon />
						</IconButton>
					</ListItem>
				</List>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
