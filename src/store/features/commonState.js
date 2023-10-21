import { createSlice } from '@reduxjs/toolkit';

// Check local storage for a saved location, if none use the default 'Nordic'
const storedLocation = localStorage.getItem('location');
const defaultLocation = storedLocation ? storedLocation : 'Nordic';
const token = localStorage.getItem('token');
const defaultToken = token ? token : '';

const initialState = {
  location: defaultLocation.toLowerCase(),
  isDrawerOpen: false,
  authToken: defaultToken,
  authType: '',
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
   
    addAuthToken: (state, action) => {
      state.authToken = action.payload;
      localStorage.setItem('token', action.payload);
    },
    addAuthType: (state, action) => {
      state.authType = action.payload;
    },
  },
});

export const { addLocation, toggleStateDrawer, addAuthToken, addAuthType } = commonSlice.actions;

export default commonSlice.reducer;
