/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useContext } from 'react';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
const TOGGLE_CART = 'TOGGLE_CART';
const SET_PAYMENT_INTENT = 'SET_PAYMENT_INTENT';
const SET_CHECKOUT = 'SET_CHECKOUT';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_ORDER_ID = 'SET_ORDER_ID';

const initialState = {
	cart: [],
	isOpen: false,
	onCheckout: 'cart',
	paymentIntent: '',
	orderId: null,
	products: [],
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART: {
			const { product } = action;
			const productInCart = state.cart.find((item) => item.id === product.id);
			if (productInCart) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				};
			}
			return {
				...state,
				cart: [...state.cart, { ...product, quantity: 1 }],
			};
		}
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.product.id),
			};
		case CLEAR_CART:
			return { ...state, cart: [], orderId: null };
		case TOGGLE_CART:
			return { ...state, isOpen: !state.isOpen };
		case SET_PAYMENT_INTENT:
			return { ...state, paymentIntent: action.paymentIntent };
		case SET_CHECKOUT:
			return { ...state, onCheckout: action.checkout };
		case SET_PRODUCTS:
			return { ...state, products: action.products };
		case SET_ORDER_ID:
			return { ...state, orderId: action.orderId };
		default:
			return state;
	}
};

const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addToCart = (product) => dispatch({ type: ADD_TO_CART, product });
	const removeFromCart = (product) =>
		dispatch({ type: REMOVE_FROM_CART, product });
	const clearCart = () => dispatch({ type: CLEAR_CART });
	const toggleCart = () => dispatch({ type: TOGGLE_CART });
	const setPaymentIntent = (paymentIntent) =>
		dispatch({ type: SET_PAYMENT_INTENT, paymentIntent });
	const setCheckout = (checkout) => dispatch({ type: SET_CHECKOUT, checkout });
	const setProducts = (products) => dispatch({ type: SET_PRODUCTS, products });
	const setOrderId = (orderId) => dispatch({ type: SET_ORDER_ID, orderId });

	return (
		<CartContext.Provider
			value={{
				...state,
				addToCart,
				removeFromCart,
				clearCart,
				toggleCart,
				setPaymentIntent,
				setCheckout,
				setProducts,
				setOrderId,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
