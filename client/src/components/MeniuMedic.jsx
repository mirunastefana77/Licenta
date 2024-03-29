import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../css/MeniuMedic.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MeniuMedic = () => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  //update date every second
  setInterval(() => {
    var date = new Date();
    //format date
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    //format date with hour and seconds
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var fullDate =
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    setDate(fullDate);
  }, 1000);

  async function handleRegistruElevi() {
    navigate("/registruElevi", { replace: true });
  }

  async function handleStocMedicamente() {
    navigate("/stocMedicamente", { replace: true });
  }

  async function handleFisaMedicale() {
    navigate("/fiseMedicale", { replace: true });
  }

  async function handleDelogare() {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  }

  async function handleAdeverinteMedicale() {
    navigate("/adeverinteMedicale", { replace: true });
  }

  return (
    <div className={`${styles["meniuMedicContainer"]} ${styles["font-link"]}`}>
      <Button className="btn-info mb-4" onClick={handleRegistruElevi}>
        Registru elevi
      </Button>
      <Button className="btn-info mb-4" onClick={handleFisaMedicale}>
        Fișe medicale
      </Button>
      <Button className="btn-info mb-4" onClick={handleStocMedicamente}>
        Stoc medicamente{" "}
      </Button>
      <Button className="btn-info mb-4" onClick={handleAdeverinteMedicale}>
        Adeverințe medicale
      </Button>

      <Button className="btn-info mb-4" onClick={handleDelogare}>
        Delogare
      </Button>
      {/* <h1 className={`${styles["dateContainer"]}`}>{date}</h1> */}
    </div>
  );
};
