/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = ({ toggleActive }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = () => {
		if (searchTerm.trim() !== '') {
			navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
		}
	};

	return (
		<AppBar
			position='static'
			className='header-container'
			sx={{
				background: 'var(--second)',
				display: 'flex',
				justifyContent: 'space-between',
				borderRadius: '30px 8px',
			}}
		>
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
					<IconButton
						type='button'
						color='inherit'
						onClick={handleSearchSubmit}
					>
						<SearchIcon />
					</IconButton>
					<InputBase
						className='search-placeholder'
						placeholder='Pesquisar'
						value={searchTerm}
						onChange={handleSearchChange}
						onKeyPress={(event) => {
							if (event.key === 'Enter') {
								handleSearchSubmit();
							}
						}}
						inputProps={{ 'aria-label': 'search' }}
						sx={{ color: 'white' }}
					/>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
