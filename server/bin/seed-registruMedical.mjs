import { RegistruMedical } from "../repository.js";

const registruMedical = [
  {
    nume_elev: "Anotonescu",
    prenume_elev: "Ion",
    nume_medicament: "Paracetamol",
    nr_doza_medicament: 2,
    CabinetMedicalIdCabinet: 1,
    ElevIdElev: 1,
  },
];

function registruMedicalPopulareaza() {
  return RegistruMedical.bulkCreate(registruMedical);
}

registruMedicalPopulareaza();
