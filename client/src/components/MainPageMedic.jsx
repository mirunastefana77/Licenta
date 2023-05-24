import React from "react";
import { MeniuMedic } from "./MeniuMedic";
import styles from  "../css/MainPageMedic.module.css";

export const MainPageMedic = () => {
  let userInfo = JSON.parse(localStorage.getItem("user"));
  console.log(userInfo);
  return (
    <div className={`${styles["mainPage_container"]} ${styles["font-link"]}`}>
      <div className={`${styles["head_style"]} bg-info `}>
        <h1>
          Salut, {userInfo.nume_user} {userInfo.prenume_user}!
        </h1>
        <h2>{userInfo.unitate_invatamant}</h2>
        <h3>{userInfo.tip_user}</h3>
      </div>
      <div className={`${styles["meniu-container"]} bg-info`}>
        <MeniuMedic />
      </div>
    </div>
  );
};
