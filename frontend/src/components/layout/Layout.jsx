import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";

export const Layout = () => {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
    </div>
  );
};
