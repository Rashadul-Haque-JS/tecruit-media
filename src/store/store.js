// store.js
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './features/commonState';

const store = configureStore({
  reducer: {
    common: commonReducer, // Add other reducers here if needed
  },
});

export default store;
