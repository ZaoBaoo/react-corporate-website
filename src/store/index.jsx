import { configureStore } from "@reduxjs/toolkit";

// Slice import
import { registrationSlice } from "./registration-slice/registration-slice";
import { loginSlice } from "./login-slice/login-slice";
import { dbSlice } from "./db-slice/db-slice";

const store = configureStore({
  reducer: {
    registration: registrationSlice.reducer,
    login: loginSlice.reducer,
    db: dbSlice.reducer,
  },
});

export default store;
