import {
  CabinetMedical,
  PersonalMedical,
  User,
  RegistruMedical,
  Elev,
  FisaMedicala,
  ParinteElev,
  StocMedicamente,
} from "./repository.js";
import express from "express";
import { getAllCabinete } from "./service.mjs";
import { createAccount } from "./service.mjs";

const router = express.Router();
router.route("/cabinete").get((req, res) => {
  getAllCabinete(CabinetMedical, req, res);
});
router.route("/register").post((req, res) => {
  createAccount(User, PersonalMedical, req, res);
});

export default router;
