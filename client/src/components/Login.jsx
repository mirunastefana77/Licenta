import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let item = { email, password };
  async function handleLogin() {
    console.log(item);
    const response = await fetch("http://localhost:8088/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if(response.status === 201) {
      alert("Login reusit");
    }
    else {
      alert("Login nereusit");
    }
  }
  async function handleInregistrare() {
    navigate("/register", { replace: true });
  }
  return (
    <div className = "bg-info">
      <div className={`${styles["form-container"]} text-center`}>
        <Form className="justify-content-center align-items-center text-center">
          <h1>LOGIN</h1>
          <Form.Group className="justify-content-center align-items-center">
            <FloatingLabel label="email" className="mb-2">
              <Form.Control
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="parolă" className="mb-2">
              <Form.Control
                type="password"
                placeholder="parolă"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-2">
            <Button onClick={handleLogin}>LOGIN</Button>
          </Form.Group>
          <Form.Group>
            <Link to="/Register" onClick={handleInregistrare}>
              {" "}
              Nu ai cont, înregistrează-te!
            </Link>
          </Form.Group>
        </Form>
      </div>
      </div>
  );
};
