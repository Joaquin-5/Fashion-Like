import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { Router } from "./router/Router";
import { store } from "./store";
import "react-image-crop/dist/ReactCrop.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <Router />
    </Provider>
  </React.StrictMode>
);
