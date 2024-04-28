import { createSlice } from '@reduxjs/toolkit';

const reloadSlice = createSlice({
    name: 'reload', // Name for your slice
    initialState: {
        reloadFiles: null,
        reloadUser: null,
    },
    reducers: {
        setReloadFiles: (state, action) => {
            state.reloadFiles = action.payload;
        },
        setReloadUser: (state, action) => {
            state.reloadUser = action.payload;
        },
    },
});
export const { setReloadFiles, setReloadUser } = reloadSlice.actions;
export default reloadSlice.reducer