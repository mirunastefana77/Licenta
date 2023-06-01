import React from "react";
import Button from "react-bootstrap/esm/Button";

export const RegistruElevi = () => {
  async function handleAdaugaEleviInRegistru() {
    // sa apara un box unde sa adaugam un elev cand apasam pe butonul de adaugat elevi
  }
  return (
    <div>
      <h1>Registru Elevi</h1>
      <Button className="btn-info mt-3">Adaugă elev în registru</Button>
    </div>
  );
};
