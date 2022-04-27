import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  isLoggedIn: false,
  errorLogin: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    // Login
    loginHandler(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", action.payload);
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
