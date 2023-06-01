import { CabinetMedical } from "../repository.js";

const unitatiInvatamant = [
  { unitate_invatamant: "Colegiul National Sf. Sava" },
  { unitate_invatamant: "Liceul Teoretic Gheorghe Lazar" },
  { unitate_invatamant: "Liceul International de Informatica" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 195" },
  { unitate_invatamant: "Universitatea Politehnica din Bucuresti" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 10" },
  { unitate_invatamant: "Liceul Jean Monnet" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 23" },
  { unitate_invatamant: "Liceul Nicolae Iorga" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 76" },
  { unitate_invatamant: "Liceul Mihai Eminescu" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 98" },
  { unitate_invatamant: "Liceul Gheorghe Sincai" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 145" },
  { unitate_invatamant: "Liceul Tudor Vianu" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 179" },
  { unitate_invatamant: "Liceul Ion Neculce" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 201" },
  { unitate_invatamant: "Liceul Spiru Haret" },
  { unitate_invatamant: "Scoala Gimnaziala nr. 225" },
];

function cabinetMedicalPopulate() {
  CabinetMedical.bulkCreate(unitatiInvatamant);
}

cabinetMedicalPopulate();
