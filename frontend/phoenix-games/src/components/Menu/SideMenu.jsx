import React, { useState } from 'react';
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	Box,
	Typography,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Favorite as FavoriteIcon,
	ShoppingBag as ShoppingBagIcon,
	Home as HomeIcon,
	Category as CategoryIcon,
	Facebook as FacebookIcon,
	Twitter as TwitterIcon,
	YouTube as YouTubeIcon,
	Share as ShareIcon,
} from '@mui/icons-material';
import navListData from '../../data/navListData';
import PropTypes from 'prop-types';
import './sideMenu.css';

const iconMapping = {
	'bi-house-door': <HomeIcon />,
	'bi-window-stack': <CategoryIcon />,
	'bi-heart': <FavoriteIcon />,
	'bi-bag': <ShoppingBagIcon />,
};

function SideMenu({ active }) {
	const [navData, setNavdata] = useState(navListData);
	const [activeItem, setActiveItem] = useState(
		navListData.find((item) => item.active)._id
	);

	const handleItemClick = (id) => {
		setNavdata(
			navData.map((item) => ({
				...item,
				active: item._id === id,
			}))
		);
		setActiveItem(id);
	};

	return (
		<Drawer
			variant='persistent'
			open={active}
			anchor='left'
			sx={{ width: 240, flexShrink: 0 }}
		>
			<Box
				className='side-menu'
				sx={{
					width: 240,
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
					<Typography
						variant='h6'
						noWrap
						sx={{
							marginLeft: '16px',
							color: 'white',
							fontFamily: 'Bauhaus Modern',
							textTransform: 'uppercase',
						}}
					>
						Phoenix
					</Typography>
				</Box>
				<List>
					{navData.map((item) => (
						<ListItem
							button
							key={item._id}
							selected={item._id === activeItem}
							onClick={() => handleItemClick(item._id)}
							sx={{ color: 'white' }}
						>
							<ListItemIcon sx={{ color: 'white' }}>
								{iconMapping[item.icon]}
							</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItem>
					))}
				</List>
				<Box sx={{ marginTop: 'auto', padding: '16px' }}>
					<List
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
						}}
					>
						<IconButton color='inherit' href='#' sx={{ color: 'white' }}>
							<FacebookIcon />
						</IconButton>
						<IconButton color='inherit' href='#' sx={{ color: 'white' }}>
							<TwitterIcon />
						</IconButton>
						<IconButton color='inherit' href='#' sx={{ color: 'white' }}>
							<YouTubeIcon />
						</IconButton>
						<IconButton color='inherit' href='#' sx={{ color: 'white' }}>
							<ShareIcon />
						</IconButton>
					</List>
				</Box>
			</Box>
		</Drawer>
	);
}

SideMenu.propTypes = {
	active: PropTypes.bool.isRequired,
};

export default SideMenu;
