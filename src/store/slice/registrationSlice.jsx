import { createSlice } from "@reduxjs/toolkit";

// Начальное значение
const initialRegistrationState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  isLoading: true,
  errorRegistration: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState: initialRegistrationState,
  reducers: {
    // Loading
    stopLoading(state) {
      state.isLoading = false;
    },
    //  Step 1
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },

    //  Step 2
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },

    //  Step 3
    setPassword(state, action) {
      state.password = action.payload;
    },
    setPasswordConfirm(state, action) {
      state.passwordConfirm = action.payload;
    },

    // Registration
    clearDataStore(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.phoneNumber = "";
      state.password = "";
      state.passwordConfirm = "";
    },

    // Error
    setError(state, action) {
      state.errorRegistration = action.payload;
    },
    clearError(state) {
      state.errorRegistration = "";
    },
  },
});

// Экспортируем ACTION
export const registrationAction = registrationSlice.actions;
// Экспортируем SLICE
export { registrationSlice };
