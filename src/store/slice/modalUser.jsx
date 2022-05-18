import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  showModal: false,
  uidForShow: "",
};

const modalUserSlice = createSlice({
  name: "modalUser",
  initialState: initialModalState,
  reducers: {
    setShowModal(state, actions) {
      state.showModal = actions.payload;
    },
    setUidForShow(state, actions) {
      state.uidForShow = actions.payload;
    },
  },
});

// Экспортируем ACTION
export const modalUserAction = modalUserSlice.actions;
// Экспортируем SLICE
export { modalUserSlice };
