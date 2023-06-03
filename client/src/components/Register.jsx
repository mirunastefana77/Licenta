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
  const [cabinete, setCabinete] = useState([]);
  const [resultUser, setResultUser] = useState([]);
  const [rol, setRol] = useState("");
  const [idCabinet, setIdCabinet] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCabinete();
  }, []);

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Parola trebuie să conțină cel puțin 8 caractere, cel puțin o literă mare și cel puțin o cifră."
      );
      return false;
    } else return true;
  };

  async function fetchCabinete() {
    let result = await fetch("http://localhost:8088/api/cabinete", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 201) {
      result.json().then((data) => setCabinete(data));
    }
  }
  let item = { scoala, nume, prenume, email, password, rol };

  async function checkRegister() {
    let result = await fetch("http://localhost:8088/api/checkRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (result.status === 201) {
      result.json().then((data) => setResultUser(data));
      return true;
    } else return false;
  }

  async function handleRegister() {
    if ((await checkRegister()) === true) {
      if (validatePassword()) {
        if (resultUser.CabinetMedicalIdCabinet === idCabinet) {
          if (resultUser.tip_personal === item.rol) {
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
              alert("Eroare!");
            }
          } else {
            alert("Tipul de cadru medical nu este corect!");
          }
        } else {
          alert("Unitatea de invatamant nu este corecta!");
        }
      }
    } else {
      alert("E-mail-ul nu exista!");
    }
  }

  const onRadioChange = (e) => {
    setRol(e);
  };
  return (
    <div
      className={`${styles["color-background"]} ${styles["font-link"]} bg-info`}
    >
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
              <select
                id="scoala"
                name="scoala"
                className="form-select mb-2"
                onChange={(e) => {
                  setScoala(e.target.value);
                  setIdCabinet(e.target.selectedIndex + 1);
                }}
              >
                {cabinete?.map((cabinet) => {
                  return (
                    <option
                      key={cabinet.id_cabinet}
                      value={cabinet.unitate_invatamant}
                    >
                      {cabinet.unitate_invatamant}
                    </option>
                  );
                })}
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
