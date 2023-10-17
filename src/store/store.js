// store.js
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './features/commonState';

const store = configureStore({
  reducer: {
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

