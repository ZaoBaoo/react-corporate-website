import { createSlice } from "@reduxjs/toolkit";

import { checkLocalStorageAuth } from "../../tool-function";

const initialLoginState = {
  isLoggedIn: checkLocalStorageAuth("authData"),
  errorLogin: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    // Login
    loginHandler(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      localStorage.setItem("authData", JSON.stringify(action.payload));
    },
    // Error
    setError(state, action) {
      state.errorLogin.name = action.payload.name;
      state.errorLogin.message = action.payload.message;
    },
    // test
    clearErrorHandler(state) {
      state.errorLogin = {};
    },
  },
});

// Экспортируем ACTION
export const loginAction = loginSlice.actions;
// Экспортируем SLICE
export { loginSlice };
