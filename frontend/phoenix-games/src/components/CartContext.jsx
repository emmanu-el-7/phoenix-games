/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import OrderItemsService from '../services/orderItemService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState({});

	useEffect(() => {
		const cartLocal = window.localStorage.getItem('cart');
		if (cartLocal) {
			setCart(JSON.parse(cartLocal));
		}
	}, []);

	const addToCart = async (product, orders) => {
		try {
			const orderId = orders.id;
			const itemData = { productId: product.id, quantity: 1 };
			await OrderItemsService.addOrderItem(orderId, itemData);

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
		} catch (error) {
			console.error('Failed to add item to cart:', error);
		}
	};

	const removeFromCart = async (product, orders) => {
		try {
			const orderId = orders.id;
			const itemData = { productId: product.id, quantity: 1 };
			await OrderItemsService.removeOrderItem(orderId, itemData);

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
		} catch (error) {
			console.error('Failed to remove item from cart:', error);
		}
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
