import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";

export const AdminLayout = () => {
  return (
    <div className="container">
      <NavBar admin/>
      <Outlet />
    </div>
  );
};
