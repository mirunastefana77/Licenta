import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../css/MeniuMedic.module.css";
import { useState } from "react";

export const MeniuMedic = () => {
    const [date, setDate] = useState("");
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
        var fullDate = day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
        setDate(fullDate);
    }, 1000);
  return (
    <div className={`${styles["meniuMedicContainer"]} ${styles["font-link"]}`}>
      <h1>Meniu</h1>
      <Button className="btn-info mb-4">Registru elevi</Button>
      <Button className="btn-info mb-4">Fișe medicale</Button>
      <Button className="btn-info mb-4">Stoc medicamente</Button>
      <Button className="btn-info mb-4">Generare cerere părinți</Button>
      <h1 className={`${styles["dateContainer"]}`}>{date}</h1>
    </div>
  );
};
