import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const findItemIndex = (state,id) => state.findIndex(item => item.product.id === id);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            // payload: product object, {id:..., name:..., category:..., price:...}
            
            // Push item to array in an object with 'quantity' set to 1
            state.push({
                product: action.payload,
                quantity: 1
            });
        },
        removeItem: (state, action) => {
            // payload: id to be deleted
            // Remove an item in the array based on ID
            state.splice(findItemIndex(state,action.payload), 1)
        },
        increaseQuantity: (state, action) => {
            // payload: id of item
            state[findItemIndex(state,action.payload)].quantity += 1
        },
        decreaseQuantity: (state, action) => {
            // payload: id of item
            state[findItemIndex(state,action.payload)].quantity -= 1
        }
    }
})

export const {addItem, removeItem, increaseQuantity, decreaseQuantity} = cartSlice.actions

export const selectCartContents = state => state.cart;
export const selectItemInCart = state => {
    return id => {
        if (findItemIndex(state.cart, id) === -1) return false
        else return true
    }
}
export const selectItemQuantity = state => {
    let quantities = {};
    state.cart.forEach(item => {
        quantities[item.product.id] = item.quantity
    })
    return quantities;
}
export const selectTotalQuantity = state => {
    if (state.cart.length === 0) return 0
    else return state.cart.reduce((a,b) => ({quantity: a.quantity + b.quantity})).quantity
}
    

export default cartSlice.reducer;