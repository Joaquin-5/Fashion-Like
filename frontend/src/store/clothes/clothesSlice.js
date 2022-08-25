import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    setClothes: (state, action) => {
      state.posts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setClothes } = clothesSlice.actions;
