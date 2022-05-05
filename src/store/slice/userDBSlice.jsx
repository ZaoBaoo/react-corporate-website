import { createSlice } from "@reduxjs/toolkit";

const initialUserDBState = {
  isDataReceived: false,
  userData: {},
};

const userDBSlice = createSlice({
  name: "userDB",
  initialState: initialUserDBState,
  reducers: {
    setUserData(state, action) {
      state.isDataReceived = true;
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.isDataReceived = false;
      state.userData = {};
    },
  },
});

// Экспортируем ACTION
export const userDBAction = userDBSlice.actions;
// Экспортируем SLICE
export { userDBSlice };
