import { createSlice } from "@reduxjs/toolkit";

const checkLocalStorageAuth = () => {
  const value = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (value) {
    return JSON.parse(value);
  }
  return false;
};

const initialLoginState = {
  isLoggedIn: checkLocalStorageAuth(),
  errorLogin: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    // Login
    loginHandler(state, action) {
      state.isLoggedIn = action.payload;
    },
    // Error
    setError(state, action) {
      state.errorLogin.name = action.payload.name;
      state.errorLogin.message = action.payload.message;
    },
    clearErrorHandler(state) {
      state.errorLogin = {};
    },
  },
});

// Экспортируем ACTION
export const loginAction = loginSlice.actions;
// Экспортируем SLICE
export { loginSlice };
