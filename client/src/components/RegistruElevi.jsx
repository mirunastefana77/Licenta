import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../css/RegistruElevi.module.css";

export const RegistruElevi = () => {
  const navigate = useNavigate();
  const [elevAdaugat, setElevAdaugat] = useState([]);
  const [infoCabinet, setInfoCabinet] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  async function getElevAdaugat() {
    let result = await fetch("http://localhost:8088/api/getCabinetId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unitate_invatamant: userInfo.unitate_invatamant,
      }),
    });
    if (result.status === 201) {
      console.log(userInfo);
      result.json().then((data) => setInfoCabinet(data));
    }
  }

  async function actualizareLista() {
    if (infoCabinet.id_cabinet) {
      let result = await fetch("http://localhost:8088/api/getElevAdaugat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CabinetMedicalIdCabinet: infoCabinet.id_cabinet,
        }),
      });
      if (result.status === 201) {
        result.json().then((data) => setElevAdaugat(data));
      }
    }
  }

  useEffect(() => {
    getElevAdaugat();
  }, []);

  useEffect(() => {
    actualizareLista();
  }, [infoCabinet.id_cabinet]);

  async function handleAdaugaEleviInRegistru() {
    navigate("/adauga-elevi-in-registru", { replace: true });
  }

  async function inapoiMainPage() {
    navigate("/mainPage", { replace: true });
  }

  return (
    <div>
      <h1>Registru Elevi</h1>
      <div>
        <Button className="btn-info m-2" onClick={inapoiMainPage}>
          Înapoi la pagina principală
        </Button>
      </div>
      <Button className="btn-info m-2" onClick={handleAdaugaEleviInRegistru}>
        Adaugă elev în registru
      </Button>
      <div className={`${styles["font-link"]} m-3`}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Prenume</th>
              <th>CNP</th>
              <th>Medicament</th>
              <th>Număr doze</th>
            </tr>
          </thead>
          {elevAdaugat?.map((elev) => {
            return (
              <tbody key={elev.cnp_elev}>
                <tr>
                  <td>{elev.nume_elev}</td>
                  <td>{elev.prenume_elev}</td>
                  <td>{elev.cnp_elev}</td>
                  <td>{elev.nume_medicament}</td>
                  <td>{elev.nr_doza_medicament}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};
