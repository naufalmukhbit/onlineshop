import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: false,
    isAdmin: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            // payload: account object = {id, email, password, isAdmin}
            state.userId = action.payload.id;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: state => {
            state.userId = false;
            state.isAdmin = false;
        },
    }
})

export const { login, logout } = userSlice.actions

export const selectLoggedIn = state => state.user.userId ? true : false
export const selectIsAdmin = state => state.user.isAdmin

export default userSlice.reducer