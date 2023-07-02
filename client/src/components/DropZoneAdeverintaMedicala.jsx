import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import styles from "../css/DropZoneAdeverintaMedicala.module.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Dropzone(props) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [base64Pdf, setBase64Pdf] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const elev = JSON.parse(localStorage.getItem("elev"));

  const handleChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is a PDF
    if (file.type === "application/pdf") {
      setShowAlert(false); // Hide the alert if previously shown
      setPdfName(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target?.result;
        setBase64Pdf(contents?.toString() || "");
      };

      reader.readAsDataURL(file);
    } else {
      setShowAlert(true); // Show the alert for invalid file type
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!base64Pdf) {
        alert("Vă rugăm să selectați un fișier PDF.");
      } else if (showAlert) {
        alert(
          "Fișierul nu este de tip PDF! Vă rugăm să selectați un fișier PDF."
        );
      } else {
        const item = {
          pdf: pdfName,
          base64Pdf: base64Pdf,
          id_elev: elev.id_elev,
        };
        console.log("item", item);
        const response = await fetch(
          "http://localhost:8088/api/dropZoneAdeverintaMedicala",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          }
        );

        if (response.status === 201) {
          alert("Cererea a fost trimisă cu succes!");
          navigate("/adeverinteMedicale", { replace: true });
        } else {
          alert("Cererea nu a putut fi trimisă!");
        }
      }
    } catch (error) {
      console.log("Eroare la trimiterea cererii:", error);
      alert("A apărut o eroare la trimiterea cererii!");
    }
  };

  return (
    <Container
      id="container"
      className={`${styles["font-link"]} font-link text-center mt-5 w-60 h-100`}
    >
      <form onSubmit={handleSubmit}>
        <div className={`${styles["dropzone"]}`}>
          <input
            type="file"
            name="file"
            accept=".pdf"
            className={`${styles["input"]}`}
            onChange={handleChange}
          />
          <div className={`${styles["instructions"]}`}>
            <p>
              Trageți fișierul în chenarul din stânga sau dați click pentru a
              selecta un fișier (se acceptă doar fișiere PDF).
            </p>
          </div>
        </div>
        <Button type="submit" className="btn-info m-2">
          Trimite PDF
        </Button>
      </form>

      <Alert className="mt-2" show={showAlert} variant="danger">
        Fișierul nu este de tip PDF!
      </Alert>
    </Container>
  );
}

export default Dropzone;
