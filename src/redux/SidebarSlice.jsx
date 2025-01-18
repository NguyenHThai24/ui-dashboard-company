import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItem: localStorage.getItem('selectedItem') || '',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
      localStorage.setItem('selectedItem', action.payload);
    },
  },
});

export const { setSelectedItem } = sidebarSlice.actions;
export default sidebarSlice.reducer;
