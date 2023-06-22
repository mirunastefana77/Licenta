import { ParinteElev } from "../repository.js";

const parintiElevi = [
  //   {
  //     nume_parinte: "Antonescu",
  //     prenume_parinte: "Vasile",
  //     email_parinte: "mirunastefana7@gmail.com",
  //     nr_telefon: "0722222222",
  //     ElevIdElev: 1,
  //   },
  //   {
  //     nume_parinte: "Camil",
  //     prenume_parinte: "Ciudamir",
  //     email_parinte: "mirunastefana7@gmail.com",
  //     nr_telefon: "0723456789",
  //     ElevIdElev: 2,
  //   },
  //   {
  //     nume_parinte: "Arion",
  //     prenume_parinte: "Irina",
  //     email_parinte: "mirunastefana7@gmail.com",
  //     nr_telefon: "0723450777",
  //     ElevIdElev: 3,
  //   },
  //   {
  //     nume_parinte: "Adam",
  //     prenume_parinte: "Camelia",
  //     email_parinte: "baditamiruna20@stud.ase.ro",
  //     nr_telefon: "0723450666",
  //     ElevIdElev: 4,
  //   },
  //   {
  //     nume_parinte: "Popescu",
  //     prenume_parinte: "Andrei",
  //     email_parinte: "baditamiruna20@stud.ase.ro",
  //     nr_telefon: "0723450780",
  //     ElevIdElev: 5,
  //   },
  //   {
  //     nume_parinte: "Ionescu",
  //     prenume_parinte: "Alexandrina",
  //     email_parinte: "baditamiruna20@stud.ase.ro",
  //     nr_telefon: "0721472589",
  //     ElevIdElev: 6,
  //   },
  //   {
  //     nume_parinte: "Georgescu",
  //     prenume_parinte: "Andreea",
  //     email_parinte: "baditamiruna20@stud.ase.ro",
  //     nr_telefon: "0711789456",
  //     ElevIdElev: 7,
  //   },
  //   {
  //     nume_parinte: "Stoica",
  //     prenume_parinte: "Ionut",
  //     email_parinte: "mirunastefana7@gmail.com",
  //     nr_telefon: "0798741236",
  //     ElevIdElev: 8,
  //   },
  //   {
  //     nume_parinte: "Dumitru",
  //     prenume_parinte: "Ramona",
  //     email_parinte: "mirunastefana7@gmail.com",
  //     nr_telefon: "0711223344",
  //     ElevIdElev: 9,
  //   },
  //   {
  //     nume_parinte: "Cristea",
  //     prenume_parinte: "Andreea",
  //     email_parinte: "mirunastefana7@gmail.com",
  //     nr_telefon: "0788456258",
  //     ElevIdElev: 10,
  //   },
];

function parintiEleviPopuleaza() {
  return ParinteElev.bulkCreate(parintiElevi);
}

parintiEleviPopuleaza();
