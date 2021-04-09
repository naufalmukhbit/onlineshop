import { createSlice } from "@reduxjs/toolkit";
import { electronic, fashion, food } from "../../data/products";

const initialState = {
	electronic: electronic,
	fashion: fashion,
	food: food,
	form: {
		name: "",
		category: "",
		price: "",
	},
};

// Map category code from ID to full length
const categoryMap = { el: "electronic", fa: "fashion", fo: "food" };

// Utility function to find index of ID in Array
const findItemIndex = (array, id) => array.findIndex((item) => item.id === id);

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addProducts: (state, action) => {
			// payload: object of item (without id)

			// Get ID by taking first two letters of category and concat
			// with increment of number of products in that category.
			console.log(action.payload);
			let id =
				action.payload.category.substring(0, 2) +
				(state[action.payload.category].length + 1)
					.toString()
					.padStart(4, "0");

			// Push the new product to its category array
			state[action.payload.category].push({ id: id, ...action.payload });
		},
		editProducts: (state, action) => {
			// payload: object of product
			// Currently only name and price are available to be changed

			let index = findItemIndex(
				state[action.payload.category],
				action.payload.id
			);

			// ID should be changed if category changed, will do later
			// state[action.payload.category].id = action.payload.id;

			state[action.payload.category][index].name = action.payload.name;

			// Category change will trigger ID change, will do later
			// state[action.payload.category].category = action.payload.category;

			state[action.payload.category][index].price = action.payload.price;
		},
		removeProducts: (state, action) => {
			// payload: id of product
			let category = categoryMap[action.payload.substring(0, 2)];
			state[category].splice(
				findItemIndex(state[category], action.payload),
				1
			);
		},
		setName: (state, action) => {
			state.form.name = action.payload;
		},
		setCategory: (state, action) => {
			state.form.category = action.payload;
		},
		setPrice: (state, action) => {
			state.form.price = action.payload;
		},
		resetForm: (state, action) => {
			state.form = { name: "", category: "", price: "" };
		},
	},
});

export const {
	addProducts,
	editProducts,
	removeProducts,
	setName,
	setCategory,
	setPrice,
	resetForm,
} = productSlice.actions;

// Selector to select all products
export const selectProducts = (state) => [
	...state.products.electronic,
	...state.products.fashion,
	...state.products.food,
];

// Selector to select product object based on its ID
export const selectProductDetail = (state) => {
	// Return object with given ID from its category array
	return (id) => {
		// Retrieve category code from ID
		let code = id.substring(0, 2);
		// Retrieve product by ID on category array
		return state.products[categoryMap[code]][
			findItemIndex(state.products[categoryMap[code]], id)
		];
	};
};

export const selectProductForm = (state) => {
	return state.products.form;
};

export default productSlice.reducer;
