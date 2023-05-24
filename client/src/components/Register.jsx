import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Register.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/Button";

export const Register = () => {
  const [scoala, setScoala] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  let cabinete = [];
  useEffect(() => async () => {
    let result = await fetch("http://localhost:8088/api/cabinete", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 201) {
      result
        .json()
        .then((data) => localStorage.setItem("cabinete", JSON.stringify(data)));
    }
  });
  cabinete = JSON.parse(localStorage.getItem("cabinete"));
  function getCabinete() {
    return cabinete.map((cabinet) => {
      return <option value={cabinet.id}>{cabinet.unitate_invatamant}</option>;
    });
  }
  console.log(getCabinete());

  let item = { scoala, nume, prenume, email, password, rol };
  console.log(item);
  async function handleRegister() {
    let result = await fetch("http://localhost:8088/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (result.status === 201) {
      navigate("/", { replace: true });
    } else {
      alert("Eroare la crearea contului");
    }
  }

  const onRadioChange = (e) => {
    setRol(e);
  };
  return (
    <div className={`${styles["color-background"]} ${styles["font-link"]} bg-info`}>
      <div className={`${styles["form-container"]}`}>
        <Form className="justify-content-center align-items-center ">
          <Form.Group className="justify-content-center align-items-center text-center mb-3">
            <h1>CREEAZĂ CONT</h1>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center">
            <Form.Group className="justify-content-center align-items-center"></Form.Group>
            <FloatingLabel
              label="Alege unuitatea de învățământ:"
              className="mb-2"
            >
              <select id="scoala" name="scoala" className="form-select mb-2" onChange=
                {(e) => {
                  setScoala(e.target.value);
                }}>
                {getCabinete()}
              </select>
            </FloatingLabel>
            <FloatingLabel label="nume" className="mb-2">
              <Form.Control
                id="name"
                name="name"
                type="text"
                placeholder="nume"
                onChange={(e) => {
                  setNume(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="prenume" className="mb-2">
              <Form.Control
                id="prenume"
                name="prenume"
                type="text"
                placeholder="prenume"
                onChange={(e) => {
                  setPrenume(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="email" className="mb-2">
              <Form.Control
                id="email"
                name="email"
                type="text"
                placeholder="e-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FloatingLabel>
            <Form.Label className="mb-2">
              Alege tipul de cadru medical corespunzător:
            </Form.Label>
            <Form.Check
              name="medic/asistent"
              type="radio"
              label="Medic"
              onChange={(e) => {
                onRadioChange("Medic");
              }}
            ></Form.Check>
            <Form.Check
              className="mb-2"
              name="medic/asistent"
              type="radio"
              label="Asistent"
              onChange={(e) => {
                onRadioChange("Asistent");
              }}
            ></Form.Check>
            <FloatingLabel label="parolă" className="mb-2">
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="parolă"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center text-center mb-2 mt-3 ">
            <Button onClick={handleRegister} className="btn-info">
              CREEAZĂ
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
