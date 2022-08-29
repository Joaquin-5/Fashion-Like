import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    openSideBar: (state, action) => {
        state.open = true
    },
    closeSideBar: (state, open) => {
        state.open = false
    }
  },
});

// Action creators are generated for each case reducer function
export const { openSideBar, closeSideBar } =
sideBarSlice.actions;
