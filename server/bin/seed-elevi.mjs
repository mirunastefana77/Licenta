import { Elev } from "../repository.js";

const elevi = [
  // {
  //   nume_elev: "Antonescu",
  //   prenume_elev: "Ion",
  //   cnp: 5010101890123,
  //   data_nasterii: "2001-01-01",
  //   RegistruMedicalIdRegistruMedical: 1,
  // },
  // {
  //   nume_elev: "camil",
  //   prenume_elev: "Petrescu",
  //   cnp: 5010202890124,
  //   data_nasterii: "2001-02-02",
  //   RegistruMedicalIdRegistruMedical: 1,
  // },
];

function eleviPopulareaza() {
  return Elev.bulkCreate(elevi);
}

eleviPopulareaza();
