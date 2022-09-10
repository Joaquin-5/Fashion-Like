import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Layout } from "../components/layout/Layout";
import { HomeScreen, LoginScreen, NotFound, RegisterScreen } from "../screens";
import { checkAuthState } from "../store/auth";

export const Router = () => {
  const dispatch = useDispatch();
  // Renew token
  useEffect(() => {
    dispatch(checkAuthState());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
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
