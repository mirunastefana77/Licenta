import bcrypt from "bcrypt";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Op } from "sequelize";

const accessKeyIdRoot = "";
const secretAccessKeyRoot = "";

const client = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: accessKeyIdRoot,
    secretAccessKey: secretAccessKeyRoot,
  },
});

async function getAllCabinete(model, req, res) {
  const cabinete = await model.findAll();
  if (cabinete) {
    res.status(201).send(cabinete);
  } else {
    res.status(404).send("Not found");
  }
}

async function createAccount(modelUser, modelPers, req, res) {
  const { scoala, nume, prenume, email, password, rol } = req.body;
  console.log(scoala, nume, prenume, email, password, rol);
  const verify = await modelPers.findOne({
    where: {
      email_personal: email,
    },
  });
  if (verify) {
    const hash = await bcrypt.hash(password, 10);
    const user = await modelUser.create({
      unitate_invatamant: scoala,
      nume_user: nume,
      prenume_user: prenume,
      email_user: email,
      parola_user: hash,
      tip_user: rol,
      PersonalMedicalIdPersonalMedical: verify.id_personal_medical,
    });
    if (user) {
      res.status(201).send(user);
    } else {
      res.status(404).send("Not found");
    }
  } else {
    res.status(404).send("Not found");
  }
}

async function getLogin(model, req, res) {
  const { email, password } = req.body;
  const user = await model.findOne({
    where: {
      email_user: email,
    },
  });
  if (user) {
    console.log("User gasit");
    const match = await bcrypt.compare(password, user.parola_user);
    if (match) {
      res.status(201).send(user);
    } else {
      res.status(401).send("Not found");
    }
  } else {
    console.log("User NU gasit");
    res.status(404).send("Not found");
  }
}

async function checkRegister(modelPersonalMedical, req, res) {
  const personal = await modelPersonalMedical.findOne({
    where: {
      email_personal: req.body.email,
    },
  });
  console.log(personal);
  if (personal) {
    res.status(201).send(personal);
  } else {
    res.status(404).send("Not found");
  }
}

async function getCabinetId(model, req, res) {
  const cabinet = await model.findOne({
    where: {
      unitate_invatamant: req.body.unitate_invatamant,
    },
  });
  console.log(cabinet);
  if (cabinet) {
    res.status(201).send(cabinet);
  } else {
    res.status(404).send("Not found");
  }
}

async function getMedicamente(model, req, res) {
  const medicamente = await model.findAll({
    where: {
      CabinetMedicalIdCabinet: req.body.id_cabinet,
    },
  });
  console.log(medicamente);
  if (medicamente) {
    res.status(201).send(medicamente);
  } else {
    res.status(404).send("Not found");
  }
}

async function getElevID(model, req, res) {
  const elev = await model.findOne({
    where: {
      cnp: req.body.cnp_elev,
    },
  });
  console.log(req.body.cnp_elev);
  if (elev) {
    res.status(201).send(elev);
  } else {
    res.status(404).send("Not found");
  }
}

async function adaugaElev(modelRegistru, modelStocMed, req, res) {
  const elev = await modelRegistru.create({
    nume_elev: req.body.nume_elev,
    prenume_elev: req.body.prenume_elev,
    cnp_elev: req.body.cnp_elev,
    nume_medicament: req.body.nume_medicament,
    nr_doza_medicament: req.body.nr_doza_medicament,
    CabinetMedicalIdCabinet: req.body.CabinetMedicalIdCabinet,
    ElevIdElev: req.body.ElevIdElev,
  });
  console.log(elev);
  if (elev) {
    const medicament = await modelStocMed.findOne({
      where: {
        nume_medicament: req.body.nume_medicament,
        CabinetMedicalIdCabinet: req.body.CabinetMedicalIdCabinet,
      },
    });
    medicament.nr_doza_medicament =
      medicament.nr_doza_medicament - req.body.nr_doza_medicament;
    medicament.save();
    res.status(201).send(elev);
  } else {
    res.status(404).send("Not found");
  }
}

async function getElevAdaugat(model, req, res) {
  console.log(req.body.CabinetMedicalIdCabinet);
  const elev = await model.findAll({
    where: {
      CabinetMedicalIdCabinet: req.body.CabinetMedicalIdCabinet,
    },
  });
  if (elev) {
    console.log(elev);
    res.status(201).send(elev);
  } else {
    res.status(404).send("Not found");
  }
}

async function getStocMedicamente(model, req, res) {
  const medicamente = await model.findAll({
    where: {
      CabinetMedicalIdCabinet: req.body.CabinetMedicalIdCabinet,
    },
  });
  console.log(medicamente);
  if (medicamente) {
    res.status(201).send(medicamente);
  } else {
    res.status(404).send("Not found");
  }
}

async function getElevi(model, req, res) {
  const elevi = await model.findAll({
    where: {
      CabinetMedicalIdCabinet: req.body.CabinetMedicalIdCabinet,
    },
  });
  console.log(elevi);
  if (elevi) {
    res.status(201).send(elevi);
  } else {
    res.status(404).send("Not found");
  }
}

async function getFisaMedicala(modelFisa, modelElev, req, res) {
  console.log(req.body.CNP);
  const elev = await modelElev.findOne({
    where: {
      cnp: req.body.CNP,
    },
  });
  if (elev) {
    const uploadResult = await client.send(
      new PutObjectCommand({
        Bucket: "fisamedicalalicenta",
        Key: `pdf/${req.body.pdfNume}`,
        Body: req.body.pdfBase64,
        ACL: "public-read",
        ContentType: "application/pdf",
      })
    );
    if (uploadResult) {
      const pdfUrl = `https://fisamedicalalicenta.s3.eu-central-1.amazonaws.com/pdf/${req.body.pdfNume}`;
      const fisa = await modelFisa.create({
        nume_elev: req.body.nume,
        prenume_elev: req.body.prenume,
        pdf_fisa_medicala: pdfUrl,
        vaccinari: req.body.vaccinari,
        boli: req.body.boli,
        alergii: req.body.alergii,
        tratamente: req.body.tratamente,
        unitate_invatamant: req.body.unitate_invatamant,
        ElevIdElev: elev.id_elev,
      });
      if (fisa) {
        res.status(201).send(fisa);
      } else {
        res.status(404).send("Not found fisa");
      }
    } else {
      res.status(404).send("Not found pdf");
    }
  } else {
    res.status(404).send("Not found elev");
  }
}

async function getFiseMedicale(model, req, res) {
  const fise = await model.findAll({
    where: {
      unitate_invatamant: req.body.unitate_invatamant,
    },
  });
  console.log(fise);
  if (fise) {
    res.status(201).send(fise);
  } else {
    res.status(404).send("Not found");
  }
}

async function getParinteElev(modelParinte, modelElev, req, res) {
  const parinti = await modelParinte.findAll({
    where: {
      ElevIdElev: {
        [Op.in]: req.body.id_elevi,
      },
    },
  });
  if (parinti) {
    res.status(201).send(parinti);
  } else {
    res.status(404).send("Not found parinti");
  }
}

export {
  getAllCabinete,
  createAccount,
  getLogin,
  checkRegister,
  getCabinetId,
  getMedicamente,
  getElevID,
  adaugaElev,
  getElevAdaugat,
  getStocMedicamente,
  getElevi,
  getFisaMedicala,
  getFiseMedicale,
  getParinteElev,
};
