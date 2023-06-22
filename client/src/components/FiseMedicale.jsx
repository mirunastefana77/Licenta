import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../css/FisaMedicala.module.css";
import { PDFDocument, decodeFromBase64 } from "pdf-lib";
import { saveAs } from "file-saver";
import emailjs from "emailjs-com";

export const FiseMedicale = () => {
  const navigate = useNavigate();
  const [fiseAdaugata, setFiseAdaugata] = useState([]);
  const [parintiElevi, setParintiElevi] = useState([]);
  const [idElevi, setIdElevi] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  async function getFiseAdaugata() {
    let result = await fetch("http://localhost:8088/api/getFiseMedicale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unitate_invatamant: userInfo.unitate_invatamant,
      }),
    });
    if (result.status === 201) {
      await result.json().then((data) => setFiseAdaugata(data));
    }
  }
  async function getParinteElev() {
    console.log(idElevi);
    let result = await fetch("http://localhost:8088/api/getParinteElev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_elevi: idElevi,
      }),
    });
    if (result.status === 201) {
      await result.json().then((data) => setParintiElevi(data));
    }
  }

  async function inapoiMainPage() {
    navigate("/mainPage", { replace: true });
  }

  async function adaugaFisaMedicala() {
    navigate("/adaugaFisaMedicala", { replace: true });
  }

  useEffect(() => {
    getFiseAdaugata();
  }, [setFiseAdaugata]);

  useEffect(() => {
    setIdElevi(fiseAdaugata.map((fisa) => fisa.ElevIdElev));
  }, [fiseAdaugata]);

  useEffect(() => {
    getParinteElev();
  }, [idElevi]);

  return (
    <div>
      <h1 className="m-2">Fișe Medicale</h1>
      <div>
        <Button className="btn-info m-2" onClick={inapoiMainPage}>
          Înapoi la pagina principală
        </Button>
      </div>
      <Button className="btn-info m-2" onClick={adaugaFisaMedicala}>
        Adaugă fișă medicală
      </Button>
      <div className={`${styles["form-container"]}`}>
        <div className={`${styles["padding-color"]}`}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Prenume</th>
                <th>Vaccinări</th>
                <th>Alergii</th>
                <th>Boli cronice</th>
                <th>Tratamente</th>
              </tr>
            </thead>
            {fiseAdaugata?.map((fisa) => {
              return (
                <tbody key={fisa.id_fisa_medicala}>
                  <tr key={fisa.id_fisa_medicala}>
                    <td>{fisa.nume_elev}</td>
                    <td>{fisa.prenume_elev}</td>
                    <td>{fisa.vaccinari}</td>
                    <td>{fisa.alergii}</td>
                    <td>{fisa.boli}</td>
                    <td>{fisa.tratamente}</td>
                    <td>
                      <Button
                        className="btn-info"
                        onClick={async () => {
                          if (fisa.pdf_fisa_medicala) {
                            const response = await fetch(
                              fisa.pdf_fisa_medicala,
                              {
                                mode: "cors",
                              }
                            );
                            const pdfDataUrl = await response.text();
                            const uint8Array = new Uint8Array(
                              [...atob(pdfDataUrl)].map((char) =>
                                char.charCodeAt(0)
                              )
                            );
                            const pdfDoc = await PDFDocument.load(uint8Array);
                            const pdfBytes = await pdfDoc.save();
                            const blob = new Blob([pdfBytes], {
                              type: "application/pdf",
                            });
                            saveAs(
                              blob,
                              `${fisa.nume_elev}-${fisa.prenume_elev}-${fisa.cnp_elev}.pdf`
                            );
                          }
                        }}
                      >
                        Descarcă fișă medicală pdf
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn-info"
                        onClick={async () => {
                          console.log(parintiElevi);
                          if (parintiElevi) {
                            const serviceID = "service_fxy6dej";
                            const templateID = "template_4zf19bu";
                            const publicKey = "lbwL4bt3-kqxgGl_0";
                            const nume_elev = fisa.nume_elev;
                            const prenume_elev = fisa.prenume_elev;
                            const nume_parinte = parintiElevi.find(
                              (parinte) =>
                                parinte.ElevIdElev === fisa.ElevIdElev
                            )?.nume_parinte;
                            const prenume_parinte = parintiElevi.find(
                              (parinte) =>
                                parinte.ElevIdElev === fisa.ElevIdElev
                            )?.prenume_parinte;
                            const templateParams = {
                              nume_elev: nume_elev,
                              prenume_elev: prenume_elev,
                              nume_parinte: nume_parinte,
                              prenume_parinte: prenume_parinte,
                              tip_cadru_medical: userInfo.tip_user,
                              nume_cadru_medical: userInfo.nume_user,
                              prenume_cadru_medical: userInfo.prenume_user,
                              unitate_invatamant: userInfo.unitate_invatamant,
                            };

                            emailjs
                              .send(
                                serviceID,
                                templateID,
                                templateParams,
                                publicKey
                              )
                              .then(
                                function (response) {
                                  console.log(
                                    "SUCCESS!",
                                    response.status,
                                    response.text
                                  );
                                },
                                function (error) {
                                  console.log("FAILED...", error);
                                }
                              );
                          }
                        }}
                      >
                        Trimite înștiințare prin email părintelui
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
