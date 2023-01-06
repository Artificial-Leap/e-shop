import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "eng",
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { changeLanguage } = translateSlice.actions;

export default translateSlice.reducer;
