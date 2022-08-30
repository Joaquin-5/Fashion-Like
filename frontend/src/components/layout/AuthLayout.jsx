import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="container grid-center">
      <Outlet />
    </div>
  );
};
