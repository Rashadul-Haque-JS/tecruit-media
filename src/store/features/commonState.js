import { createSlice } from '@reduxjs/toolkit';

// Check local storage for a saved location, if none use the default 'Nordic'
const storedLocation = localStorage.getItem('location');
const defaultLocation = storedLocation ? storedLocation : 'Nordic';

const initialState = {
  location: defaultLocation,
  isDrawerOpen: false,
  isLogin:false
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.location = action.payload;
      // Save the location to local storage
      localStorage.setItem('location', action.payload);
    },
    toggleStateDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    toggleStateLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});

export const { addLocation, toggleStateDrawer, toggleStateLogin } = commonSlice.actions;

export default commonSlice.reducer;
