/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState({});
	useEffect(() => {
		const cartLocal = window.localStorage.getItem('cart');
		if (cartLocal) {
			setCart(JSON.parse(cartLocal));
		}
	}, []);

	const addToCart = (product) => {
		setCart((oldCart) => {
			const quantity = oldCart[product.id] ? oldCart[product.id].quantity : 0;
			const newCart = {
				...oldCart,
				[product.id]: {
					quantity: quantity + 1,
					product,
				},
			};
			window.localStorage.setItem('cart', JSON.stringify(newCart));
			return newCart;
		});
	};

	return (
		<CartContext.Provider value={{ cart, addToCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
