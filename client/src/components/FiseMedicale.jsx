import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export const FiseMedicale = () => {
  const navigate = useNavigate();
  async function inapoiMainPage() {
    navigate("/mainPage", { replace: true });
  }

  async function adaugaFisaMedicala() {
    navigate("/adaugaFisaMedicala", { replace: true });
  }

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
    </div>
  );
};
