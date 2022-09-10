import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { clothesSlice } from "./clothes/clothesSlice";
import { sideBarSlice } from "./sideBar/sideBarSlice";

export const store = configureStore({
  reducer: {
    clothes: clothesSlice.reducer,
    sideBar: sideBarSlice.reducer,
    auth: authSlice.reducer,
  },
});
