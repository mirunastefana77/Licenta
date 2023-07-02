import React from "react";
import Button from "react-bootstrap/esm/Button";
import { FloatingLabel, Form, FormCheck, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/FormularRegistru.module.css";

export const FormularRegistru = () => {
  const [elevID, setElevID] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [medicamente, setMedicamente] = useState([]);
  const [medicamentSelectat, setMedicamentSelectat] = useState("");
  const [doza, setDoza] = useState("");
  const [CNP, setCNP] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log(userInfo.unitate_invatamant);
  const [cabinetID, setCabinetID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
    returnCabinetID();
  }, [userInfo.unitate_invatamant]);

  useEffect(() => {
    async function returnMedicamente() {
      let result = await fetch("http://localhost:8088/api/getMedicamente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_cabinet: cabinetID }),
      });
      if (result.status === 201) {
        result.json().then((data) => setMedicamente(data));
      }
    }
    returnMedicamente();
  }, [cabinetID]);

  console.log(cabinetID);
  console.log(medicamente);

  const onRadioChange = (doza) => {
    setDoza(doza);
  };

  async function getElevID() {
    let result = await fetch("http://localhost:8088/api/getElevID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cnp_elev: CNP,
      }),
    });
    if (result.status === 201) {
      await result.json().then((data) => {
        setElevID(data.id_elev);
        console.log(elevID);
      });
    }
  }

  async function handleAdaugare() {
    await getElevID();
    console.log(elevID);
    console.log(cabinetID);
    const item = {
      nume_elev: nume,
      prenume_elev: prenume,
      cnp_elev: CNP,
      nume_medicament: medicamentSelectat,
      nr_doza_medicament: doza,
      CabinetMedicalIdCabinet: cabinetID,
      ElevIdElev: elevID,
    };

    let result = await fetch("http://localhost:8088/api/adaugaElev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (result.status === 201) {
      alert("Elev adăugat cu succes!");
      navigate("/registruElevi", { replace: true });
    }
  }

  console.log(medicamentSelectat);

  return (
    <div
      className={`${styles["color-background"]} ${styles["font-link"]} bg-info`}
    >
      <div className={`${styles["form-container"]}`}>
        <Form className="justify-content-center align-items-center ">
          <Form.Group className="justify-content-center align-items-center text-center mb-3">
            <h1>Adaugă elev</h1>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center">
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
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center">
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
            <FloatingLabel label="CNP" className="mb-2">
              <Form.Control
                id="cnp"
                name="cnp"
                type="text"
                placeholder="CNP"
                onChange={(e) => {
                  setCNP(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center">
            <Form.Label label="Medicament administrat" className="mb-2">
              <select
                id="medicament"
                name="medicament"
                className="form-select mb-2"
                onChange={(e) => {
                  setMedicamentSelectat(e.target.value);
                }}
              >
                {medicamente?.map((medicament) => {
                  return (
                    <option
                      key={medicament.id_stoc_medicamente}
                      value={medicament.nume_medicament}
                    >
                      {medicament.nume_medicament},{" "}
                      {medicament.nr_doza_medicament} buc. rămase
                    </option>
                  );
                })}
              </select>
            </Form.Label>
          </Form.Group>
          <Form.Group className="justify-content-center align-items-center">
            <Form.Label className="mb-2">Doză:</Form.Label>
            <FormCheck
              className="mb-2"
              type="radio"
              label="1"
              name="doza"
              onChange={(e) => {
                onRadioChange("1");
              }}
            ></FormCheck>
            <FormCheck
              className="mb-2"
              type="radio"
              label="2"
              name="doza"
              onChange={(e) => {
                onRadioChange("2");
              }}
            ></FormCheck>
            <FormCheck
              className="mb-2"
              type="radio"
              label="3"
              name="doza"
              onChange={(e) => {
                onRadioChange("3");
              }}
            ></FormCheck>
          </Form.Group>
          <FormGroup className="justify-content-center align-items-center text-center mb-2 mt-3 ">
            <Button onClick={handleAdaugare} className="btn-info">
              Adaugă elev
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
