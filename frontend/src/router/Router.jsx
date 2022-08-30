import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Layout } from "../components/layout/Layout";
import { NotFound } from "../screens/404";
import { Home } from "../screens/Home";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="error" element={<NotFound />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterScreen />} />
            <Route path="login" element={<LoginScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
