
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  location: 'Nordic',
  isDrawerOpen: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    toggleStateDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const {addLocation, toggleStateDrawer } = commonSlice.actions;


export default commonSlice.reducer;
