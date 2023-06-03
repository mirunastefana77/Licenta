import { Sequelize, DataTypes } from "sequelize";
import { faker } from "@faker-js/faker";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
});

const CabinetMedical = sequelize.define(
  "CabinetMedical",
  {
    id_cabinet: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unitate_invatamant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const PersonalMedical = sequelize.define(
  "PersonalMedical",
  {
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const User = sequelize.define(
  "User",
  {
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
    tip_user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Medic", "Asistent"]],
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const RegistruMedical = sequelize.define(
  "RegistruMedical",
  {
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
    cnp_elev: {
      type: DataTypes.INTEGER,
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Elev = sequelize.define(
  "Elev",
  {
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const FisaMedicala = sequelize.define(
  "FisaMedicala",
  {
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
    pdf_fisa_medicala: {
      type: DataTypes.BLOB,
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const StocMedicamente = sequelize.define(
  "StocMedicamente",
  {
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const ParinteElev = sequelize.define(
  "ParinteElev",
  {
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

CabinetMedical.hasMany(PersonalMedical, { foreignKey: { allowNull: true } });
PersonalMedical.belongsTo(CabinetMedical);

PersonalMedical.hasOne(User, { foreignKey: { allowNull: true } });
User.belongsTo(PersonalMedical);

CabinetMedical.hasMany(RegistruMedical, { foreignKey: { allowNull: true } });
RegistruMedical.belongsTo(CabinetMedical);

CabinetMedical.hasMany(Elev, { foreignKey: { allowNull: true } });
Elev.belongsTo(CabinetMedical);

Elev.hasMany(RegistruMedical, { foreignKey: { allowNull: true } });
RegistruMedical.belongsTo(Elev);

Elev.hasOne(FisaMedicala, { foreignKey: { allowNull: true } });
FisaMedicala.belongsTo(Elev);

Elev.hasOne(ParinteElev, { foreignKey: { allowNull: true } });
ParinteElev.belongsTo(Elev);

CabinetMedical.hasOne(StocMedicamente, { foreignKey: { allowNull: true } });
StocMedicamente.belongsTo(CabinetMedical);

// RegistruMedical.hasOne(StocMedicamente, { foreignKey: { allowNull: true } });
// StocMedicamente.belongsTo(RegistruMedical);

// sterge tabela User
// User.sync({ force: true });

//FisaMedicala.drop();

async function init() {
  await sequelize.authenticate();
  await sequelize.sync();
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
