import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  filter: null,
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
      state.posts = state.posts.map((e) => {
        if (e._id === action.payload._id) {
          return action.payload;
        }
        return e;
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((e) => e._id !== action.payload);
    },
    searchPost: (state, action) => {
      const filterPosts = (p) =>
        p.title.toLowerCase().includes(action.payload.toLowerCase());
      state.filter =
        state.posts.filter(filterPosts).length === state.posts.length
          ? null
          : state.posts.filter(filterPosts);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setClothes, newPost, editPost, deletePost, searchPost } =
  clothesSlice.actions;
