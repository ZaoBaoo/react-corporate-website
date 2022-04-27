import { createSlice } from "@reduxjs/toolkit";

const initialDBState = {
  dataReceived: false,
  userData: {},
};

const dbSlice = createSlice({
  name: "db",
  initialState: initialDBState,
  reducers: {
    setDBData(state, action) {
      state.dataReceived = true;
      state.userData = action.payload;
    },
    clearDBData(state) {
      state.dataReceived = false;
      state.userData = {};
    },
  },
});

// Экспортируем ACTION
export const dbAction = dbSlice.actions;
// Экспортируем SLICE
export { dbSlice };
