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
import { getLogin } from "./service.mjs";
import { checkRegister } from "./service.mjs";
import { getCabinetId } from "./service.mjs";
import { getMedicamente } from "./service.mjs";
import { getElevID } from "./service.mjs";
import { adaugaElev } from "./service.mjs";
import { getElevAdaugat } from "./service.mjs";
import { getStocMedicamente } from "./service.mjs";
import { getElevi } from "./service.mjs";
import { getFisaMedicala } from "./service.mjs";
import { getFiseMedicale } from "./service.mjs";
import { getParinteElev } from "./service.mjs";

const router = express.Router();
router.route("/cabinete").get((req, res) => {
  getAllCabinete(CabinetMedical, req, res);
});
router.route("/register").post((req, res) => {
  createAccount(User, PersonalMedical, req, res);
});
router.route("/login").post((req, res) => {
  getLogin(User, req, res);
});
router.route("/checkRegister").post((req, res) => {
  checkRegister(PersonalMedical, req, res);
});
router.route("/getMedicamente").post((req, res) => {
  getMedicamente(StocMedicamente, req, res);
});
router.route("/getCabinetId").post((req, res) => {
  getCabinetId(CabinetMedical, req, res);
});
router.route("/getElevID").post((req, res) => {
  getElevID(Elev, req, res);
});
router.route("/adaugaElev").post((req, res) => {
  adaugaElev(RegistruMedical, StocMedicamente, req, res);
});
router.route("/getElevAdaugat").post((req, res) => {
  getElevAdaugat(RegistruMedical, req, res);
});
router.route("/getStocMedicamente").post((req, res) => {
  getStocMedicamente(StocMedicamente, req, res);
});
router.route("/getElevi").post((req, res) => {
  getElevi(Elev, req, res);
});
router.route("/getFisaMedicala").post((req, res) => {
  getFisaMedicala(FisaMedicala, Elev, req, res);
});
router.route("/getFiseMedicale").post((req, res) => {
  getFiseMedicale(FisaMedicala, req, res);
});
router.route("/getParinteElev").post((req, res) => {
  getParinteElev(ParinteElev, Elev, req, res);
});

export default router;
