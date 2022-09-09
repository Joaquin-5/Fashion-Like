import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  isLoading: false,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.open = true;
    },
    closeSideBar: (state) => {
      state.open = false;
    },
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSideBar, closeSideBar, changeLoading } = sideBarSlice.actions;
