import { configureStore } from "@reduxjs/toolkit";

// Slice import
import { registrationSlice } from "./slice/registrationSlice";
import { loginSlice } from "./slice/loginSlice";
import { userDBSlice } from "./slice/userDBSlice";
import { mobileSlice } from "./slice/mobileSlice";
import { modalUserSlice } from "./slice/modalUser";
import { searchSlice } from "./slice/searchSlice";

const store = configureStore({
  reducer: {
    registration: registrationSlice.reducer,
    login: loginSlice.reducer,
    userDB: userDBSlice.reducer,
    mobile: mobileSlice.reducer,
    modalUser: modalUserSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
