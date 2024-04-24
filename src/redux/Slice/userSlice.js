import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user', // Name for your slice
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export default userSlice