import react from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "../css/AdaugareFisaMedicala.module.css";

export const AdaugareFisaMedicala = () => {
  const [elevi, setElevi] = useState([]);
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [vaccinari, setVaccinari] = useState("");
  const [alergii, setAlergii] = useState("");
  const [boli, setBoli] = useState("");
  const [tratamente, setTratamente] = useState("");
  const [cabinetID, setCabinetID] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  async function returnCabinetID() {
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
      result.json().then((data) => setCabinetID(data.id_cabinet));
    }
  }

  async function importNumePrenumeElevi() {
    if (cabinetID !== "") {
      let response = await fetch("http://localhost:8088/api/getElevi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CabinetMedicalIdCabinet: cabinetID }),
      });
      if (response.status === 201) {
        response.json().then((data) => setElevi(data));
        console.log(elevi);
      }
    }
  }

  useEffect(() => {
    returnCabinetID();
  }, []);

  useEffect(() => {
    importNumePrenumeElevi();
  }, [cabinetID]);

  async function handleOnChangeNumePrenume(e) {
    const numePrenume = e.target.value;
    const numePrenumeArray = numePrenume.split(" ");
    setNume(numePrenumeArray[0]);
    setPrenume(numePrenumeArray[1]);
  }

  async function handleAdaugareFisaMedicala() {
    // let result = await fetch("http://localhost:8088/api/adaugareFisaMedicala", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     nume: nume,
    //     prenume: prenume,
    //     vaccinari: vaccinari,
    //     alergii: alergii,
    //     boli: boli,
    //     tratamente: tratamente,
    //   }),
    // });
    // if (result.status === 201) {
    //   navigate("/fisa-medicala");
    // }
  }

  return (
    <div
      className={`${styles["color-background"]} ${styles["font-link"]} bg-info`}
    >
      <div className={`${styles["form-container"]}`}>
        <Form className="ustify-content-center align-items-center">
          <Form.Group className="justify-content-center align-items-center text-center mb-3">
            <h1>Adaugă fișă medicală</h1>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center">
            <Form.Label className="mb-2">Nume Prenume</Form.Label>
            <Form.Group className="justify-content-center align-items-center">
              <select
                id="elevi"
                name="elevi"
                className="form-select mb-3"
                onChange={(e) => {
                  handleOnChangeNumePrenume(e);
                }}
              >
                {elevi?.map((elev) => {
                  const fullName = `${elev.nume_elev} ${elev.prenume_elev}`;
                  const value = `${elev.nume_elev} ${elev.prenume_elev}`;
                  return (
                    <option key={elev.id_elev} value={value}>
                      {fullName}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center">
            <FloatingLabel label="vacinări" className="mb-2">
              <Form.Control
                id="vaccinari"
                name="vaccinari"
                type="text"
                placeholder="vaccinări"
                onChange={(e) => {
                  setVaccinari(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="alergii" className="mb-2">
              <Form.Control
                id="alergii"
                name="alergii"
                type="text"
                placeholder="alergii"
                onChange={(e) => {
                  setAlergii(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="boli" className="mb-2">
              <Form.Control
                id="boli"
                name="boli"
                type="text"
                placeholder="boli"
                onChange={(e) => {
                  setBoli(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="tratamente" className="mb-2">
              <Form.Control
                id="tratamente"
                name="tratamente"
                type="text"
                placeholder="tratamente"
                onChange={(e) => {
                  setTratamente(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center text-center mb-2 mt-3 ">
            <Button
              onClick={handleAdaugareFisaMedicala}
              className="btn-info m-2"
            >
              Adaugă fișă medicală
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
