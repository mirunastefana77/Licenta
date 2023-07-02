import React, { useEffect, useState } from "react";
import { MeniuMedic } from "./MeniuMedic";
import styles from "../css/MainPageMedic.module.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./images/Poza2.jpg";
import Button from "react-bootstrap/esm/Button";

export const MainPageMedic = () => {
  const [userInfo, setUserInfo] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [eleviAparitii, setEleviAparitii] = useState({});
  const [elevNrMaxAparitii, setElevNrMaxAparitii] = useState(null);
  const [medicamenteUtilizate, setMedicamenteUtilizate] = useState({});
  const [medicamentMaxDoze, setMedicamentMaxDoze] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  async function getEleviDinRegistru(unitate_invatamant) {
    const item = { unitate_invatamant: unitate_invatamant };
    console.log(item);
    const response = await fetch(
      "http://localhost:8088/api/getRegistruMedical",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    const data = await response.json();
    console.log(data);

    if (data && data.length > 0) {
      // Calculăm numărul de apariții pentru fiecare elev
      const eleviAparitii = {};
      data.forEach((elev) => {
        const cheie = `${elev.nume_elev} ${elev.prenume_elev}`;
        if (eleviAparitii[cheie]) {
          eleviAparitii[cheie]++;
        } else {
          eleviAparitii[cheie] = 1;
        }
      });

      // Găsim elevul cu cele mai multe apariții
      let elevCuCeleMaiMulteAparitii = null;
      let numarMaximAparitii = 0;
      for (const cheie in eleviAparitii) {
        if (eleviAparitii[cheie] > numarMaximAparitii) {
          numarMaximAparitii = eleviAparitii[cheie];
          const [numeElev, prenumeElev] = cheie.split(" ");
          elevCuCeleMaiMulteAparitii = {
            nume_elev: numeElev,
            prenume_elev: prenumeElev,
            numar_aparitii: numarMaximAparitii,
          };
          setElevNrMaxAparitii(elevCuCeleMaiMulteAparitii);
        }
      }

      console.log(
        "Elevul cu cele mai multe apariții:",
        elevCuCeleMaiMulteAparitii
      );
      setEleviAparitii(eleviAparitii);
    }
  }

  useEffect(() => {
    if (userInfo.unitate_invatamant) {
      getEleviDinRegistru(userInfo.unitate_invatamant);
      getMedicamenteUtilizate(userInfo.unitate_invatamant);
    }
  }, [userInfo.unitate_invatamant]);

  async function getMedicamenteUtilizate(unitate_invatamant) {
    const item = { unitate_invatamant: unitate_invatamant };
    const response = await fetch(
      "http://localhost:8088/api/getRegistruMedical",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    const data = await response.json();
    console.log(data);

    if (data && data.length > 0) {
      // Calculăm numărul de doze pentru fiecare medicament
      const medicamenteUtilizate = {};
      data.forEach((medicament) => {
        const cheie = medicament.nume_medicament;
        if (medicamenteUtilizate[cheie]) {
          medicamenteUtilizate[cheie] += medicament.nr_doza_medicament;
        } else {
          medicamenteUtilizate[cheie] = medicament.nr_doza_medicament;
        }
      });

      // Găsim medicamentul cu cele mai multe doze
      let medicamentCuCeleMaiMulteDoze = null;
      let numarMaximDoze = 0;
      for (const cheie in medicamenteUtilizate) {
        if (medicamenteUtilizate[cheie] > numarMaximDoze) {
          numarMaximDoze = medicamenteUtilizate[cheie];
          medicamentCuCeleMaiMulteDoze = {
            nume_medicament: cheie,
            nr_doza_medicament: numarMaximDoze,
          };
          setMedicamentMaxDoze(medicamentCuCeleMaiMulteDoze);
        }
      }

      console.log(
        "Medicamentul cu cele mai multe doze:",
        medicamentCuCeleMaiMulteDoze
      );
      setMedicamenteUtilizate(medicamenteUtilizate);
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [date, setDate] = useState("");

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

  async function handleRapoarteGenerale() {
    navigate("/rapoarteGenerale", { replace: true });
  }

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={`${styles["mainPage_container"]}`}>
        <div className={`${styles["ribbon_container"]} bg-info`}>
          <div className={styles["left_content"]}>
            <div className={styles["name_container"]}>
              <h1>
                Salut, {userInfo.nume_user} {userInfo.prenume_user}!
              </h1>
            </div>
            <div className={styles["info_container"]}>
              <h2>{userInfo.unitate_invatamant}</h2>
              <h3>{userInfo.tip_user}</h3>
            </div>
          </div>
          <button className={styles["menu-toggle"]} onClick={toggleMenu}>
            Meniu
          </button>
        </div>
        {menuOpen && (
          <div className={`${styles["meniu-container"]} bg-info`}>
            <MeniuMedic />
          </div>
        )}
        <div>
          <h1 className={`${styles["dateContainer"]} bg-info`}>{date}</h1>
        </div>
        <div className={`${styles["eleviAparitii"]}`}>
          <h1>Elevii cu cele mai multe apariții în registru</h1>
          {Object.keys(eleviAparitii).map((cheie) => {
            const [numeElev, prenumeElev] = cheie.split(" ");
            const numarAparitii = eleviAparitii[cheie];
            const isMaximAparitii =
              numarAparitii === elevNrMaxAparitii?.numar_aparitii;

            return isMaximAparitii ? (
              <div>
                <h2>
                  {numeElev} {prenumeElev} - {numarAparitii} apariții
                </h2>
              </div>
            ) : null;
          })}
        </div>
        <div className={`${styles["medicamenteUtilizate"]} tranparent`}>
          <h1>Medicamentele cu cele mai multe doze utilizate</h1>
          {Object.keys(medicamenteUtilizate).map((cheie) => {
            const numarDoze = medicamenteUtilizate[cheie];
            const isMaximDoze =
              numarDoze === medicamentMaxDoze?.nr_doza_medicament;

            return isMaximDoze ? (
              <div>
                <h2>
                  {cheie} - {numarDoze} doze utilizate
                </h2>
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div>
        <Button
          className={`${styles["butonRapoarteGenerale"]} btn-info`}
          onClick={handleRapoarteGenerale}
        >
          {" "}
          Raport stoc medicamente
        </Button>
      </div>
    </div>
  );
};
