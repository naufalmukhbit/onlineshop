import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const findItemIndex = (state, id) =>
	state.findIndex((item) => item.product.id === id);

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			// payload: product object, {id:..., name:..., category:..., price:...}
			// Push item to array in an object with 'quantity' set to 1
			state.push({
				product: action.payload,
				quantity: 1,
			});
		},
		removeItem: (state, action) => {
			// payload: id to be deleted
			// Remove an item in the array based on ID
			state.splice(findItemIndex(state, action.payload), 1);
		},
		increaseQuantity: (state, action) => {
			// payload: id of item
			// Increment 'quantity' by 1
			state[findItemIndex(state, action.payload)].quantity += 1;
		},
		decreaseQuantity: (state, action) => {
			// payload: id of item
			// Decrement 'quantity' by 1
			state[findItemIndex(state, action.payload)].quantity -= 1;
		},
	},
});

export const {
	addItem,
	removeItem,
	increaseQuantity,
	decreaseQuantity,
} = cartSlice.actions;

// Selector to select all cart contents
export const selectCartContents = (state) => state.cart;

// Selector to check if item is in card
// Takes ID as argument
export const selectItemInCart = (state) => {
	return (id) => {
		if (findItemIndex(state.cart, id) === -1) return false;
		else return true;
	};
};

// Selector to select quantity of an item
// Takes ID as argument
export const selectItemQuantity = (state) => {
	let quantities = {};
	state.cart.forEach((item) => {
		quantities[item.product.id] = item.quantity;
	});
	return quantities;
};

// Selector to select total of all quantities
export const selectTotalQuantity = (state) => {
	if (state.cart.length === 0) return 0;
	else
		return state.cart.reduce((a, b) => ({
			quantity: a.quantity + b.quantity,
		})).quantity;
};

// Selector to select total of all product prices
export const selectTotalPrice = (state) => {
	if (state.cart.length === 0) return 0;
	else {
		let itemTotals = state.cart.map(
			(item) => item.product.price * item.quantity
		);
		return itemTotals.reduce((a, b) => a + b);
	}
};

export default cartSlice.reducer;
