import { PersonalMedical } from "../repository.js";

const personalMedical = [
  {
    nume_personal: "Popescu",
    prenume_personal: "Ion",
    email_personal: "popescu.ion@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 1,
  },
  {
    nume_personal: "Ionescu",
    prenume_personal: "Alin",
    email_personal: "ionescu.alin@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 1,
  },
  {
    nume_personal: "Marinescu",
    prenume_personal: "Ana",
    email_personal: "marinescu.ana@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 2,
  },
  {
    nume_personal: "Enescu",
    prenume_personal: "Mario",
    email_personal: "enescu.mario@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 2,
  },
  {
    nume_personal: "Badita",
    prenume_personal: "Miruna",
    email_personal: "badita.miruna@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 3,
  },
  {
    nume_personal: "Balan",
    prenume_personal: "Mihai",
    email_personal: "balan.mihai@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 3,
  },
  {
    nume_personal: "Badita",
    prenume_personal: "Mara",
    email_personal: "badita.mara@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 4,
  },
  {
    nume_personal: "Ciobanu",
    prenume_personal: "Mihaela",
    email_personal: "ciobanu.mihaela@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 4,
  },
  {
    nume_personal: "Ichim",
    prenume_personal: "Carina",
    email_personal: "ichim.carina@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 5,
  },
  {
    nume_personal: "Badita",
    prenume_personal: "Elena",
    email_personal: "badita.elena@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 5,
  },
  {
    nume_personal: "Sarima",
    prenume_personal: "Alina",
    email_personal: "sarima.alina@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 6,
  },
  {
    nume_personal: "Dinu",
    prenume_personal: "Alexandra",
    email_personal: "dinu.alexandra@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 6,
  },
  {
    nume_personal: "Popa",
    prenume_personal: "Andreea",
    email_personal: "popa.andreea@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 7,
  },
  {
    nume_personal: "Andrei",
    prenume_personal: "Nicusor",
    email_personal: "andrei.nicusor@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 7,
  },
  {
    nume_personal: "Alexandrescu",
    prenume_personal: "Vlad",
    email_personal: "alexandrescu.vlad@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 8,
  },
  {
    nume_personal: "Ali",
    prenume_personal: "Sener",
    email_personal: "ali.senere@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 8,
  },
  {
    nume_personal: "Anton",
    prenume_personal: "Flavia",
    email_personal: "anton.flavia@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 9,
  },
  {
    nume_personal: "Radulescu",
    prenume_personal: "Denis",
    email_personal: "radulescu.denis@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 9,
  },
  {
    nume_personal: "Blaga",
    prenume_personal: "Flavia",
    email_personal: "blaga.flavia@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 10,
  },
  {
    nume_personal: "Tarba",
    prenume_personal: "Sabin",
    email_personal: "tarba.sabin@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 10,
  },
  {
    nume_personal: "Zamfir",
    prenume_personal: "Iuliana",
    email_personal: "zamfir.iuliana@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 11,
  },
  {
    nume_personal: "Calin",
    prenume_personal: "Mihail",
    email_personal: "calin.mihail@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 11,
  },
  {
    nume_personal: "Anghel",
    prenume_personal: "Alexandra",
    email_personal: "anghel.alexandra@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 12,
  },
  {
    nume_personal: "Olaru",
    prenume_personal: "Raluca",
    email_personal: "olaru.raluca@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 12,
  },
  {
    nume_personal: "Panaite",
    prenume_personal: "Anda",
    email_personal: "panaite.anda@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 13,
  },
  {
    nume_personal: "Adam",
    prenume_personal: "Maria",
    email_personal: "adam.maria@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 13,
  },
  {
    nume_personal: "Mihaila",
    prenume_personal: "Ana-Maria",
    email_personal: "mihaila.ana-maria@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 14,
  },
  {
    nume_personal: "Necula",
    prenume_personal: "Cristian",
    email_personal: "necula.cristian@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 14,
  },
  {
    nume_personal: "Ionita",
    prenume_personal: "Oana",
    email_personal: "ionita.oana@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 15,
  },
  {
    nume_personal: "Diaconu",
    prenume_personal: "Sara",
    email_personal: "diaconu.sara@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 15,
  },
  {
    nume_personal: "David",
    prenume_personal: "Sorin",
    email_personal: "david.sorin@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 16,
  },
  {
    nume_personal: "Traian",
    prenume_personal: "Marinela",
    email_personal: "traian.marinela@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 16,
  },
  {
    nume_personal: "Raducanu",
    prenume_personal: "Irina",
    email_personal: "raducanu.irina@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 17,
  },
  {
    nume_personal: "Pamfilie",
    prenume_personal: "Antonia",
    email_personal: "pamfilie.antonia@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 17,
  },
  {
    nume_personal: "Ojog",
    prenume_personal: "Alexandru",
    email_personal: "ojog.alexandru@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 18,
  },
  {
    nume_personal: "Stefanescu",
    prenume_personal: "Andrei",
    email_personal: "stefanescu.andrei@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 18,
  },
  {
    nume_personal: "Enescu",
    prenume_personal: "Stefana",
    email_personal: "enescu.stefana@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 19,
  },
  {
    nume_personal: "Sebastian",
    prenume_personal: "Xonia",
    email_personal: "sebastioan.xonia@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 19,
  },
  {
    nume_personal: "Boboc",
    prenume_personal: "Maranda",
    email_personal: "boboc.maranda@gmail.com",
    tip_personal: "Medic",
    CabinetMedicalIdCabinet: 20,
  },
  {
    nume_personal: "Tudor",
    prenume_personal: "Mircea",
    email_personal: "tudor.mircea@gmail.com",
    tip_personal: "Asistent",
    CabinetMedicalIdCabinet: 20,
  },
];

function personalMedicalPopulate() {
  PersonalMedical.bulkCreate(personalMedical);
}

personalMedicalPopulate();