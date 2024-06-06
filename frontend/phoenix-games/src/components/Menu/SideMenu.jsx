import React, { useState } from 'react';
import './sideMenu.css';
import navListData from '../../data/navListData';
import NavListItem from './NavListItem';

function SideMenu({ active }) {
	const [navData, setNavdata] = useState(navListData);

	return (
		<div className={`sideMenu ${active ? 'active' : undefined}`}>
			<a href='#' className='logo'>
				<i className='bi bi-controller'></i>
				<span className='brand'>Phoenix</span>
			</a>
			<ul className='nav'>
				{navData.map((item) => (
					<NavListItem key={item._id} item={item} />
				))}
			</ul>
			<ul className='social'>
				<li>
					<a href='#'>
						<i className='bi bi-meta'></i>
					</a>
				</li>
				<li>
					<a href='#'>
						<i className='bi bi-twitter-x'></i>
					</a>
				</li>
				<li>
					<a href='#'>
						<i className='bi bi-youtube'></i>
					</a>
				</li>
				<li>
					<a href='#' className='share'>
						<i className='bi bi-share'></i>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default SideMenu;
