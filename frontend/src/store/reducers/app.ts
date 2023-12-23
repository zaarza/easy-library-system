import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app-store',
    initialState: {
        user: {},
    },
    reducers: {
        storeUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state) => {
            state.user = {};
        },
    },
});

export default appSlice.reducer;
export const { storeUser, deleteUser } = appSlice.actions;
