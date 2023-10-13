
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isDrawerOpen: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleStateDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { toggleStateDrawer } = commonSlice.actions;


export default commonSlice.reducer;
