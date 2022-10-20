import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorageAuth = () => {
  const value = JSON.parse(localStorage.getItem('isLoggedIn'));
  if (value) {
    return JSON.parse(value);
  }
  return false;
};

const initialLoginState = {
  isLoggedIn: checkLocalStorageAuth(),
  errorLogin: {},
  forgotPasswordComplete: null
};

const loginSlice = createSlice({
  name: 'login',
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
    //  Forgot Password
    setForgotPasswordComplete(state, action) {
      state.forgotPasswordComplete = action.payload;
    }
  }
});

// Экспортируем ACTION
export const loginAction = loginSlice.actions;
// Экспортируем SLICE
export { loginSlice };
