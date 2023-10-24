import { createSlice } from '@reduxjs/toolkit';

// Check local storage for a saved location, if none use the default 'Nordic'
const storedLocation = localStorage.getItem('location');
const defaultLocation = storedLocation ? storedLocation : 'Nordic';
const token = localStorage.getItem('token');
const defaultToken = token ? token : '';
const type = localStorage.getItem('type');
const defaultType = type ? type : '';

const initialState = {
  location: defaultLocation.toLowerCase(),
  isDrawerOpen: false,
  authToken: defaultToken,
  authType: defaultType,
  authEmail: '',
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
      localStorage.setItem('type', action.payload);
    },
    addAuthEmail: (state, action) => {
      state.authEmail = action.payload;
    },
  },
});

export const { addLocation, toggleStateDrawer, addAuthToken, addAuthType,addAuthEmail } = commonSlice.actions;

export default commonSlice.reducer;
