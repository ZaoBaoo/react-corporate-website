import { createSlice } from "@reduxjs/toolkit";

const initialUserDBState = {
  // isDataReceived: false,
  userData: null,
  usersData: null,
};

const userDBSlice = createSlice({
  name: "userDB",
  initialState: initialUserDBState,
  reducers: {
    setUsersData(state, action) {
      state.usersData = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.usersData = null;
      state.userData = null;
    },
  },
});

// Экспортируем ACTION
export const userDBAction = userDBSlice.actions;
// Экспортируем SLICE
export { userDBSlice };
