import React from "react";
import Button from "react-bootstrap/esm/Button";
import styles from "../css/StocMedicamente.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const StocMedicamente = () => {
  const [stocMedicamente, setStocMedicamente] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [infoCabinet, setInfoCabinet] = useState([]);
  const navigate = useNavigate();

  async function getStocCabinet() {
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
      result.json().then((data) => setInfoCabinet(data));
    }
  }

  async function getStocMedicamente() {
    if (infoCabinet.id_cabinet) {
      let result = await fetch("http://localhost:8088/api/getStocMedicamente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CabinetMedicalIdCabinet: infoCabinet.id_cabinet,
        }),
      });
      if (result.status === 201) {
        result.json().then((data) => setStocMedicamente(data));
      }
    }
  }

  useEffect(() => {
    getStocCabinet();
  }, []);

  useEffect(() => {
    getStocMedicamente();
  }, [infoCabinet.id_cabinet]);

  async function inapoiMainPage() {
    navigate("/mainPage", { replace: true });
  }

  async function stergeMedicament(id) {
    let result = await fetch("http://localhost:8088/api/deleteMedicament", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_stoc_medicamente: id,
      }),
    });
    if (result.status === 201) {
      getStocMedicamente();
      alert("Medicamentul a fost șters cu succes!");
    } else {
      alert("Medicamentul nu a fost șters!");
    }
  }

  return (
    <div>
      <h1 className="m-2">Stoc Medicamente</h1>
      <Button className="btn-info m-3" onClick={inapoiMainPage}>
        Înapoi la pagina principală
      </Button>
      <div className={`${styles["font-link"]} m-3`}>
        <table className="table table-light">
          <thead>
            <tr>
              <th>Medicament</th>
              <th>Stoc</th>
              <th>Dată expirare</th>
            </tr>
          </thead>

          {stocMedicamente?.map((medicament) => {
            return (
              <tbody>
                <tr
                  key={medicament.id_stoc_medicamente}
                  className={
                    (medicament.nr_doza_medicament <= 10
                      ? "table-warning"
                      : "") +
                    (new Date(medicament.data_expirare) - new Date() <=
                    6 * 24 * 60 * 60 * 1000
                      ? "table-danger"
                      : "")
                  }
                >
                  <td>{medicament.nume_medicament}</td>
                  <td>{medicament.nr_doza_medicament}</td>
                  <td>
                    {new Date(medicament.data_expirare).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "2-digit", day: "2-digit" }
                    )}
                  </td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() =>
                        stergeMedicament(medicament.id_stoc_medicamente)
                      }
                    >
                      Șterge
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};
