import react from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import recharts from "recharts";
import styles from "../css/RapoarteGenerale.module.css";
import { useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export const RapoarteGenerale = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [medicamente, setMedicamente] = useState([]);
  const navigate = useNavigate();

  async function getAllMedicamente() {
    let item = { unitate_invatamant: userInfo.unitate_invatamant };
    let response = await fetch("http://localhost:8088/api/getAllMedicamente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    setMedicamente(data);
  }

  useEffect(() => {
    getAllMedicamente();
  }, []);

  console.log(medicamente);

  async function inapoiMainPage() {
    navigate("/mainPage", { replace: true });
  }

  const pieChartData = medicamente.map((medicament) => ({
    name: medicament.nume_medicament,
    value: medicament.nr_doza_medicament,
  }));

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f0e",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#ffc658",
    "#ff6961",
    "#e78ac3",
    "#b28fce",
    "#ff7f0e",
    "#aec7e8",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#ff9896",
    "#9467bd",
  ];

  return (
    <div
      className={`${styles["rapoarteGeneraleContainer"]} ${styles["font-link"]} `}
    >
      <h1 className="m-2">Raport stoc medicamente</h1>
      <Button className="btn-info m-2" onClick={inapoiMainPage}>
        Înapoi în pagina principală
      </Button>
      <div className={`${styles["chartContainer"]} m-4`}>
        <PieChart width={500} height={500}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};
