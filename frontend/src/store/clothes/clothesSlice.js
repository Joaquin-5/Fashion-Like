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
    newPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    editPost: (state, action) => {
      state.posts = state.posts.map(e => {
        if(e._id === action.payload._id) {
          return action.payload;
        }
        return e;
    })
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(e => (e._id !== action.payload))
    }
  },
});

// Action creators are generated for each case reducer function
export const { setClothes, newPost, editPost, deletePost } = clothesSlice.actions;
