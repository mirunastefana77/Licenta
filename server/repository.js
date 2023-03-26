import { Sequelize, DataTypes } from "sequelize";
import {faker} from "@faker-js/faker"
const sequelize = new Sequelize(
  {
    dialect: "sqlite",
    storage: "./database.db",
  }
);

const CabinetMedical = sequelize.define("CabinetMedical", {
  id_cabinet: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unitate_invatamant: {
    type: DataTypes.STRING,
    allowNull: false,
  } 
},
{
  timestamps: false,
  freezeTableName: true,
});

const PersonalMedical = sequelize.define("PersonalMedical", {
  id_personal_medical: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume_personal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume_personal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_personal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tip_personal: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Medic", "Asistent"]],
    },
}, 
}, {
  timestamps: false,
  freezeTableName: true,
});

const User = sequelize.define("User", {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unitate_invatamant: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nume_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parola_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tip_user:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Medic", "Asistent"]],
    },
  }
  
}, {
  timestamps: false,
  freezeTableName: true,
});

const RegistruMedical = sequelize.define("RegistruMedical", {
  id_registru_medical: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume_elev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume_elev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nume_medicament: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nr_doza_medicament: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},  {
  timestamps: false,
  freezeTableName: true,
});

const Elev = sequelize.define("Elev", {
  id_elev: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume_elev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume_elev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_nasterii: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},  {
  timestamps: false,
  freezeTableName: true,
});

const FisaMedicala = sequelize.define("FisaMedicala", {
  id_fisa_medicala: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume_elev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume_elev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vaccinari: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alergii: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  boli: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tratamente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},  {
  timestamps: false,
  freezeTableName: true,
});

const StocMedicamente = sequelize.define("StocMedicamente", {
  id_stoc_medicamente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume_medicament: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nr_doza_medicament: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_expirare: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},  {
  timestamps: false,
  freezeTableName: true,
});

const ParinteElev = sequelize.define("ParinteElev", {
  id_parinte_elev: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume_parinte: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume_parinte: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_parinte: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nr_telefon: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},  {
  timestamps: false,
  freezeTableName: true,
});

CabinetMedical.hasMany(PersonalMedical);
PersonalMedical.belongsTo(CabinetMedical);

PersonalMedical.hasOne(User);
User.belongsTo(PersonalMedical);

CabinetMedical.hasOne(RegistruMedical);
RegistruMedical.belongsTo(CabinetMedical);

RegistruMedical.hasMany(Elev);
Elev.belongsTo(RegistruMedical);

Elev.hasOne(FisaMedicala);
FisaMedicala.belongsTo(Elev);

Elev.hasOne(ParinteElev);
ParinteElev.belongsTo(Elev);

CabinetMedical.hasOne(StocMedicamente);
StocMedicamente.belongsTo(CabinetMedical);

RegistruMedical.hasOne(StocMedicamente);
StocMedicamente.belongsTo(RegistruMedical);

// const CabinetMedicalFaker = []
// for (let i = 0; i < 10; i++) {
//   CabinetMedicalFaker.push({
//     unitate_invatamant: faker.address.streetAddress(),
//   });
// }

// CabinetMedical.bulkCreate(CabinetMedicalFaker);

// const PersonalMedicalFaker = [];
// for (let i = 0; i < 25; i++) {
//   PersonalMedicalFaker.push({
//     nume_personal: faker.name.firstName(),
//     prenume_personal: faker.name.lastName(),
//     tip_personal: "Medic",
//     email_personal: faker.internet.email(),
//     parola_personal: faker.internet.password(),
//   });
// }

// PersonalMedical.bulkCreate(PersonalMedicalFaker);

async function init() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
}

export {
  init,
  CabinetMedical,
  PersonalMedical,
  User,
  RegistruMedical,
  Elev,
  FisaMedicala,
  StocMedicamente,
  ParinteElev,
};