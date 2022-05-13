import { createSlice } from "@reduxjs/toolkit";

const initialMobileState = {
  isMobileSize: window.innerWidth < 425,
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState: initialMobileState,
  reducers: {
    toggle(state, actions) {
      state.isMobileSize = actions.payload;
    },
  },
});

// Экспортируем ACTION
export const mobileAction = mobileSlice.actions;
// Экспортируем SLICE
export { mobileSlice };
