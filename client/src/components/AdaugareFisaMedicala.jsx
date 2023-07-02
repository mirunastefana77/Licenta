import react from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "../css/AdaugareFisaMedicala.module.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const AdaugareFisaMedicala = () => {
  const [elevi, setElevi] = useState([]);
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [vaccinari, setVaccinari] = useState("");
  const [alergii, setAlergii] = useState("");
  const [boli, setBoli] = useState("");
  const [tratamente, setTratamente] = useState("");
  const [cabinetID, setCabinetID] = useState("");
  const [CNP, setCNP] = useState("");
  const [pdfBase64, setPdfBase64] = useState("");
  const navigate = useNavigate();

  const componentRef = useRef();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  let PDFDocum = null;

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
    setCNP(numePrenumeArray[2]);
  }

  async function handleAdaugareFisaMedicala() {
    await createPDFBlob();
    console.log("PDF Blob as Base64:", pdfBase64);
    if (PDFDocum) {
      console.log(nume, prenume, vaccinari, alergii, boli, tratamente, CNP);
      let result = await fetch("http://localhost:8088/api/getFisaMedicala", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nume: nume,
          prenume: prenume,
          vaccinari: vaccinari,
          alergii: alergii,
          boli: boli,
          tratamente: tratamente,
          CNP: CNP,
          unitate_invatamant: userInfo.unitate_invatamant,
          pdfBase64: PDFDocum,
          pdfNume: `${nume}_${prenume}_${CNP}.pdf`,
        }),
      });
      if (result.status === 201) {
        navigate("/fiseMedicale", { replace: true });
      }
    } else {
      alert("Nu s-a putut genera fisa medicala!");
    }
  }

  function formatDate(date) {
    if (date) {
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    } else {
      return "";
    }
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function createPDFBlob() {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 12;

      const text = `Elevul/a, ${nume} ${prenume}, cu CNP-ul ${CNP}, este vaccinat/a cu ${vaccinari}. \nSufera de boli: ${boli}. Este alergic/a: ${alergii}. Urmeaza tratamentul: ${tratamente}.\n`;

      const currentDate = formatDate(new Date());

      const userData = `${userInfo.tip_user}, ${userInfo.nume_user} ${userInfo.prenume_user}`;

      page.drawText("FISA MEDICALA", {
        x: 50,
        y: height - 50,
        size: 18,
        font: await pdfDoc.embedFont(StandardFonts.TimesRoman),
      });

      page.drawText(text, {
        x: 50,
        y: height - 100,
        size: fontSize,
        font: await pdfDoc.embedFont(StandardFonts.TimesRoman),
      });

      page.drawText("Data generarii:", {
        x: 50,
        y: height - 150,
        size: fontSize,
        font: await pdfDoc.embedFont(StandardFonts.TimesRoman),
      });

      page.drawText(currentDate, {
        x: 150,
        y: height - 150,
        size: fontSize,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      });

      page.drawText(userData, {
        x: 50,
        y: height - 200,
        size: fontSize,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBase64 = arrayBufferToBase64(pdfBytes);
      PDFDocum = pdfBase64;
    } catch (error) {
      console.error("Error creating PDF Blob:", error);
    }
  }

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
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
                  const fullNameCNP = `${elev.nume_elev} ${elev.prenume_elev} ${elev.cnp}`;
                  const value = `${elev.nume_elev} ${elev.prenume_elev} ${elev.cnp}`;
                  return (
                    <option key={elev.id_elev} value={value}>
                      {fullNameCNP}
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
      {/* <div className={`${styles["preview-shadow"]}`}>
          <div className={`${styles["preview-container"]}`}>
            <div className={`${styles["preview"]}`}>
              <p className="text-center mb-5">Preview fișă medicală</p>
              <div ref={componentRef} id={styles["cerere"]}>
                <h1 className="text-center">FIȘĂ MEDICALĂ</h1>
                <p id={styles["elevul"]}>
                  Elevul/a, {nume} {prenume}, cu CNP-ul {CNP}, este vaccinat/ă
                  cu {vaccinari}. Suferă de boli: {boli}. Este alergic/ă:{" "}
                  {alergii}. Urmează tratamentul: {tratamente}.
                </p>
                <p id={styles["date"]}> Data generării</p>
                <p id={styles["date"]} className="mt-0">
                  {" "}
                  {formatDate(new Date())}
                </p>
                <p id={styles["cadru-medical"]}>
                  {userInfo.tip_user}ul, {userInfo.nume_user}{" "}
                  {userInfo.prenume_user}
                </p>
                <p id={styles["puncte1"]}> ................................</p>
              </div>
            </div>
          </div>
        </div> */}
    </div>
  );
};
