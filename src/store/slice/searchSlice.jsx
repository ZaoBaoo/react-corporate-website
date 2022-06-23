import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = {
  searchMode: "",
  textForSearch: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setSearchMode(state, actions) {
      state.searchMode = actions.payload;
    },
    setTextForSearch(state, actions) {
      state.textForSearch = actions.payload;
    },
  },
});

export const searchAction = searchSlice.actions;
export { searchSlice };
