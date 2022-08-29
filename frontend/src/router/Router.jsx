import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { NotFound } from "../screens/404";
import { Home } from "../screens/Home";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="error" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
