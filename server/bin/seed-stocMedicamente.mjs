import { StocMedicamente } from "../repository.js";

const stocMedicamente = [
  //   {
  //     nume_medicament: "Paracetamol",
  //     nr_doza_medicament: 100,
  //     data_expirare: "2023-12-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Nurofen",
  //     nr_doza_medicament: 80,
  //     data_expirare: "2023-12-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Aspirină",
  //     nr_doza_medicament: 120,
  //     data_expirare: "2023-11-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Vitamina C",
  //     nr_doza_medicament: 90,
  //     data_expirare: "2023-12-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Nospa",
  //     nr_doza_medicament: 150,
  //     data_expirare: "2023-12-10",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Algocalmin",
  //     nr_doza_medicament: 11,
  //     data_expirare: "2023-12-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Sirop de tuse",
  //     nr_doza_medicament: 15,
  //     data_expirare: "2023-10-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Vitamina D",
  //     nr_doza_medicament: 100,
  //     data_expirare: "2024-01-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Plasturi",
  //     nr_doza_medicament: 400,
  //     data_expirare: "2026-12-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Panadol",
  //     nr_doza_medicament: 13,
  //     data_expirare: "2024-10-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Pansamente",
  //     nr_doza_medicament: 16,
  //     data_expirare: "2027-12-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  //   {
  //     nume_medicament: "Metoclopramid",
  //     nr_doza_medicament: 75,
  //     data_expirare: "2024-12-12",
  //     CabinetMedicalIdCabinet: 3,
  //   },
  // {
  //   nume_medicament: "Calciu",
  //   nr_doza_medicament: 75,
  //   data_expirare: "2023-06-06",
  //   CabinetMedicalIdCabinet: 3,
  // },
  // {
  //   nume_medicament: "Ibuprofen",
  //   nr_doza_medicament: 20,
  //   data_expirare: "2023-06-03",
  //   CabinetMedicalIdCabinet: 3,
  // },
];

function stocMedicamentePopulareaza() {
  return StocMedicamente.bulkCreate(stocMedicamente);
}

stocMedicamentePopulareaza();
