import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let item = { email, password };
  async function handleLogin() {
    console.log(item);
  }
  async function handleInregistrare() {
    navigate("/register", { replace: true });
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="e-mail"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button onClick={handleLogin}>LOGIN</button>
      <button onClick={handleInregistrare}>Nu ai deja cont?</button>
    </div>
  );
};
