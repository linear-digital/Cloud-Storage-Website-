import { createSlice } from '@reduxjs/toolkit';

const toolSlice = createSlice({
    name: 'tools', // Name for your slice
    initialState: {
        showSidebar: false,
        selectedFile: null
    },
    reducers: {
        setShowSidebar: (state, action) => {
            state.showSidebar = action.payload;
        },
        setSelectedFile: (state, action) => {
            state.selectedFile = action.payload;
        }
    },
});
export const { setShowSidebar, setSelectedFile } = toolSlice.actions;
export default toolSlice.reducer