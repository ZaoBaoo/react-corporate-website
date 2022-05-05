import { configureStore } from "@reduxjs/toolkit";

// Slice import
import { registrationSlice } from "./slice/registrationSlice";
import { loginSlice } from "./slice/loginSlice";
import { userDBSlice } from "./slice/userDBSlice";

const store = configureStore({
  reducer: {
    registration: registrationSlice.reducer,
    login: loginSlice.reducer,
    userDB: userDBSlice.reducer,
  },
});

export default store;
