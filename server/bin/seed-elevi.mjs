import { Elev } from "../repository.js";

const elevi = [
  // {
  //   nume_elev: "Antonescu",
  //   prenume_elev: "Ion",
  //   cnp: 5010101890123,
  //   data_nasterii: "2001-01-01",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Camil",
  //   prenume_elev: "Petrescu",
  //   cnp: 5010202890124,
  //   data_nasterii: "2001-02-02",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Arion",
  //   prenume_elev: "Alina",
  //   cnp: 6010303890125,
  //   data_nasterii: "2001-03-03",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Adam",
  //   prenume_elev: "Ionita",
  //   cnp: 5010404666666,
  //   data_nasterii: "2001-04-04",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Popescu",
  //   prenume_elev: "Ana",
  //   cnp: 6020324788888,
  //   data_nasterii: "2002-03-24",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Ionescu",
  //   prenume_elev: "Alex",
  //   cnp: 5030624900000,
  //   data_nasterii: "2003-06-24",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Georgescu",
  //   prenume_elev: "Andrei",
  //   cnp: 5040125011111,
  //   data_nasterii: "2004-01-25",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Stoica",
  //   prenume_elev: "Alin",
  //   cnp: 5050225122222,
  //   data_nasterii: "2005-02-25",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Dumitru",
  //   prenume_elev: "Roxana",
  //   cnp: 6060425233333,
  //   data_nasterii: "2006-04-25",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_elev: "Cristea",
  //   prenume_elev: "Corina",
  //   cnp: 6060726233333,
  //   data_nasterii: "2006-07-26",
  //   CabinetMedicalIdCabinet: 3,
  // },
];

function eleviPopulareaza() {
  return Elev.bulkCreate(elevi);
}

eleviPopulareaza();
