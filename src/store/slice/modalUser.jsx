import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  showModal: false,
  uidForShow: "",
  editDisabled: true,
};

const modalUserSlice = createSlice({
  name: "modalUser",
  initialState: initialModalState,
  reducers: {
    setShowModal(state, actions) {
      state.showModal = actions.payload;
    },
    setUID(state, actions) {
      state.uidForShow = actions.payload;
    },
    toggleEdit(state) {
      state.editDisabled = !state.editDisabled;
    },
  },
});

// Экспортируем ACTION
export const modalUserAction = modalUserSlice.actions;
// Экспортируем SLICE
export { modalUserSlice };
