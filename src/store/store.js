// store.js
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './features/commonState';
import companyReducer from './features/company';

const store = configureStore({
  reducer: {
    common: commonReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

