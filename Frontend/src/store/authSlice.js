import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    role: null,
    isLoading: true
};

export const authSlice = createSlice({
    name: "Auth",
    initialState,

    reducers: {

        setUser: (state, action) => {

            const user = action.payload;

            state.user = user;
            state.isAuthenticated = true;
            state.role = user.role;
            state.isLoading = false;
        },
        logoutUser: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            state.isLoading = false;

        },
    }
});


export const {
    setUser,
    logoutUser
} = authSlice.actions;


export default authSlice.reducer;