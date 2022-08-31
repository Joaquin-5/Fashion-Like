import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { clothesSlice } from "./clothes/clothesSlice";
import { counterSlice } from "./counter/counterSlice";
import { sideBarSlice } from "./sideBar/sideBarSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    clothes: clothesSlice.reducer,
    sideBar: sideBarSlice.reducer,
    auth: authSlice.reducer,
  },
});
