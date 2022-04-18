import { configureStore } from "@reduxjs/toolkit";

// Slice import
import { registrationSlice } from "./registration-slice/registration-slice";

const store = configureStore({
  reducer: {
    registration: registrationSlice.reducer,
  },
});

export default store;
