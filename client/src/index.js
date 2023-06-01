import React from "react";
import ReactDOM from "react-dom/client";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { MainPageMedic } from "./components/MainPageMedic";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistruElevi } from "./components/RegistruElevi";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mainPage" element={<MainPageMedic/>} />
      <Route path="/registruElevi" element={<RegistruElevi/>} />
    </Routes>
  </BrowserRouter>
);