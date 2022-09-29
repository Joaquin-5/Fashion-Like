import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Layout } from "../components/layout/Layout";
import {
  HomeScreen,
  LoginScreen,
  NotFound,
  RegisterScreen,
  ManageUsersScreen,
} from "../screens";
import { checkAuthState } from "../store/auth";

export const Router = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="manageUsers"
              element={
                <ProtectedRoute user={user}>
                  <ManageUsersScreen />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to={"/"} re />;
  }
  return children;
};
