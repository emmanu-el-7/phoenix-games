import React from 'react';

const Categories = ({ products, reference }) => {
	return (
		<section className='categories' ref={reference}>
			<div className='container-categories'>
				<div className='row'></div>
			</div>
		</section>
	);
};

export default Categories;
