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

const router = express.Router();
router.route("/cabinete").get((req, res) => {
  getAllCabinete(CabinetMedical, req, res);
});

export default router;
