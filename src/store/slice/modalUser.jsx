import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  showModal: false,
  uidForShowUserPage: "",
  uidForShowChat: "",
  editDisabled: true,
};

const modalUserSlice = createSlice({
  name: "modalUser",
  initialState: initialModalState,
  reducers: {
    setShowModal(state, actions) {
      state.showModal = actions.payload;
    },
    setUIDForShowUserPage(state, actions) {
      state.uidForShowUserPage = actions.payload;
    },
    toggleEdit(state) {
      state.editDisabled = !state.editDisabled;
    },
    setUIDForShowChat(state, actions) {
      state.uidForShowChat = actions.payload;
    },
  },
});

// Экспортируем ACTION
export const modalUserAction = modalUserSlice.actions;
// Экспортируем SLICE
export { modalUserSlice };
