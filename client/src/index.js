import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);