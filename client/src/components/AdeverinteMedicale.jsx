import React from "react";
import Button from "react-bootstrap/esm/Button";
import styles from "../css/AdeverinteMedicale.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";

export const AdeverinteMedicale = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const [elevi, setElevi] = useState([]);

  async function getElevi() {
    let item = { unitate_invatamant: userInfo.unitate_invatamant };
    let result = await fetch("http://localhost:8088/api/getAllElevi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (result.status === 201) {
      result.json().then((data) => setElevi(data));
    }
  }

  useEffect(() => {
    getElevi();
  }, []);

  async function inapoiMainPage() {
    navigate("/mainPage", { replace: true });
  }

  function isAsistent() {
    if (userInfo.tip_user === "Asistent") {
      return true;
    } else {
      return false;
    }
  }

  function extractBase64FromDataUrl(dataUrl) {
    const base64Prefix = "data:application/pdf;base64,";
    if (dataUrl.startsWith(base64Prefix)) {
      return dataUrl.slice(base64Prefix.length);
    }
    return dataUrl;
  }

  return (
    <div>
      <h1 className="m-2">Adeverinte Medicale</h1>
      <Button className="btn-info m-3" onClick={inapoiMainPage}>
        Înapoi la pagina principală
      </Button>
      <div className={`${styles["font-link"]} m-3`}>
        <table className="table table-light">
          <thead>
            <tr>
              <th scope="col">Nume</th>
              <th scope="col">Prenume</th>
              <th scope="col">CNP</th>
            </tr>
          </thead>
          {elevi?.map((elev) => {
            return (
              <tbody key={elev.id_elev}>
                <tr>
                  <td>{elev.nume_elev}</td>
                  <td>{elev.prenume_elev}</td>
                  <td>{elev.cnp}</td>
                  <td>
                    <Button
                      className="btn-info"
                      disabled={isAsistent()}
                      onClick={() => {
                        localStorage.setItem("elev", JSON.stringify(elev));
                        navigate("/dropZoneAdeverintaMedicala", {
                          replace: true,
                        });
                      }}
                    >
                      Adaugă adeverință medicală{" "}
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn-info"
                      disabled={!elev.adeverinta_medicala}
                      onClick={async () => {
                        console.log(elev.adeverinta_medicala);
                        if (elev.adeverinta_medicala) {
                          const response = await fetch(
                            elev.adeverinta_medicala,
                            {
                              mode: "cors",
                            }
                          );
                          const pdfDataUrl = await response.text();
                          const base64Data =
                            extractBase64FromDataUrl(pdfDataUrl);
                          const uint8Array = new Uint8Array(
                            [...atob(base64Data)].map((char) =>
                              char.charCodeAt(0)
                            )
                          );
                          console.log(base64Data);
                          const pdfDoc = await PDFDocument.load(uint8Array);
                          const pdfBytes = await pdfDoc.save();
                          const blob = new Blob([pdfBytes], {
                            type: "application/pdf",
                          });
                          saveAs(
                            blob,
                            `${elev.nume_elev}_${elev.prenume_elev}_adeverinta_medicala.pdf`
                          );
                        }
                      }}
                    >
                      Descarcă adeverință medicală{" "}
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
