import { configureStore } from "@reduxjs/toolkit";

// Slice import
import { registrationSlice } from "./slice/registrationSlice";
import { loginSlice } from "./slice/loginSlice";
import { userDBSlice } from "./slice/userDBSlice";
import { mobileSlice } from "./slice/mobileSlice";

const store = configureStore({
  reducer: {
    registration: registrationSlice.reducer,
    login: loginSlice.reducer,
    userDB: userDBSlice.reducer,
    mobile: mobileSlice.reducer,
  },
});

export default store;
