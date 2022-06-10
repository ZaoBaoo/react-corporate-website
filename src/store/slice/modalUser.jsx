import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  showModal: false,
  userForShow: "",
};

const modalUserSlice = createSlice({
  name: "modalUser",
  initialState: initialModalState,
  reducers: {
    setShowModal(state, actions) {
      state.showModal = actions.payload;
    },
    setUserForShow(state, actions) {
      state.userForShow = actions.payload;
    },
  },
});

// Экспортируем ACTION
export const modalUserAction = modalUserSlice.actions;
// Экспортируем SLICE
export { modalUserSlice };
