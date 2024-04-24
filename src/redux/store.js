import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slice/userSlice';


export const store = configureStore({
    reducer: {
        user: userSlice.reducer, // Add your slice reducer to the store
    },
});
