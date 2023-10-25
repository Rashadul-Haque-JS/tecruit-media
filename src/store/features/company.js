import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: {},
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.company = action.payload;
    },
}
});

export const { addCompany } = companySlice.actions;

export default companySlice.reducer;
