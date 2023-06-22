// import React from "react";
// import { MeniuMedic } from "./MeniuMedic";
// import styles from "../css/MainPageMedic.module.css";
// import { useEffect } from "react";
// import { useState } from "react";

// export const MainPageMedic = () => {
//   const [userInfo, setUserInfo] = useState({});
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       setUserInfo(JSON.parse(user));
//     }
//   }, [userInfo.name_user]);

//   return (
//     <div className={`${styles["mainPage_container"]} ${styles["font-link"]}`}>
//       <div className={`${styles["head_style"]} bg-info`}>
//         <h1>
//           Salut, {userInfo.nume_user} {userInfo.prenume_user}!
//         </h1>
//         <h2>{userInfo.unitate_invatamant}</h2>
//         <h3>{userInfo.tip_user}</h3>
//       </div>
//       <div className={`${styles["meniu-container"]} bg-info`}>
//         <MeniuMedic />
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { MeniuMedic } from "./MeniuMedic";
import styles from "../css/MainPageMedic.module.css";
import { useNavigate } from "react-router-dom";

export const MainPageMedic = () => {
  const [userInfo, setUserInfo] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

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

  return (
    <div className={styles["mainPage_container"]}>
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
    </div>
  );
};
