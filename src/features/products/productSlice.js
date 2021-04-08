import { createSlice } from '@reduxjs/toolkit';
import { electronic, fashion, food } from '../../data/products'

const initialState = {
    electronic: electronic,
    fashion: fashion,
    food: food
};

// Map category code from ID to full length
const categoryMap = {'el': 'electronic', 'fa':'fashion', 'fo':'food'};

// Utility function to find index of ID in Array
const findItemIndex = (array,id) => array.findIndex(item => item.id === id);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state,action) => {
            // payload: object of item (without id)

            // Get ID by taking first two letters of category and concat
            // with increment of number of products in that category.
            let id = action.payload.category.substring(0,2) + state[action.payload.category].length.toString().padStart(4,'0')

            // Push the new product to its category array
            state[action.payload.category].push({id: id, ...action.payload});
        },
        editProducts: (state,action) => {
            // payload: object of product
            state[action.payload.category].id = action.payload.id;
            state[action.payload.category].name = action.payload.name;
            state[action.payload.category].category = action.payload.category;
            state[action.payload.category].price = action.payload.price;
        },
        removeProducts: (state,action) => {
            // payload: id of product
            let category = categoryMap[action.payload.substring(0,2)];
            state[category].splice(findItemIndex(state, action.payload), 1);
        }
    }
})

export const { addProducts, editProducts, removeProducts } = productSlice.actions

// Selector to select all products
export const selectProducts = state => [...state.products.electronic, ...state.products.fashion, ...state.products.food]

// Selector to select product object based on its ID
export const selectProductDetail = state => {
    // Return object with given ID from its category array
    return id => {
        // Retrieve category code from ID
        let code = id.substring(0,2);
        // Retrieve product by ID on category array
        return state[categoryMap[code]][findItemIndex(state[categoryMap[code]],id)]
    }
}

export default productSlice.reducer;
