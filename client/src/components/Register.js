import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    }
    else {
      alert("Eroare la crearea contului");
    }
  }
  return (
    <div>
      <h1>REGISTER</h1>
      <label htmlFor="scoala">Alege unuitatea de învățământ:</label>
      <select id="scoala" name="scoala">
        onChange=
        {(e) => {
          setScoala(e.target.value);
        }}
        {getCabinete()}
      </select>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Nume"
        onChange={(e) => {
          setNume(e.target.value);
        }}
      ></input>
      <input
        id="prenume"
        name="prenume"
        type="text"
        placeholder="Prenume"
        onChange={(e) => {
          setPrenume(e.target.value);
        }}
      ></input>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="e-mail"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label htmlFor="tipCadru">Medic</label>
      <input
        id="tipCadru"
        name="medic/asistent"
        type="radio"
        value="Medic"
        checked={rol === "Medic"}
        onChange={(e) => {
          setRol("Medic");
        }}
      ></input>
      <label htmlFor="tipCadru">Asistent</label>
      <input
        id="tipCadru"
        name="medic/asistent"
        type="radio"
        value="Asistent"
        checked={rol === "Asistent"}
        onChange={(e) => {
          setRol("Asistent");
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
      <button onClick={handleRegister}>REGISTER</button>
    </div>
  );
};