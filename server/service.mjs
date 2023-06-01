import bcrypt from 'bcrypt';

async function getAllCabinete(model, req, res) {
    const cabinete = await model.findAll();
    if(cabinete){
        res.status(201).send(cabinete);
    }
    else{
        res.status(404).send("Not found");
    }
}

async function createAccount(modelUser, modelPers, req, res) {
    const {scoala,  nume, prenume, email, password, rol} = req.body;
    console.log(scoala, nume, prenume, email, password, rol);
    const verify = await modelPers.findOne({
        where: {
            email_personal: email
        }
    });
    if(verify){
        const hash = await bcrypt.hash(password, 10);
        const user = await modelUser.create({
            unitate_invatamant: scoala,
            nume_user: nume,
            prenume_user: prenume,
            email_user: email,
            parola_user: hash,
            tip_user: rol,
            PersonalMedicalIdPersonalMedical: verify.id_personal_medical
        });
        if(user){
            res.status(201).send(user);
        }
        else{
            res.status(404).send("Not found");
        }
    }
    else{
        res.status(404).send("Not found");
    }
}

async function getLogin(model, req, res){
    const {email, password} = req.body;
    const user = await model.findOne({
        where: {
            email_user: email
        }
    });
    if(user){
        console.log("User gasit");
        const match = await bcrypt.compare(password, user.parola_user);
        if(match){
            res.status(201).send(user);
        }
        else{
            res.status(401).send("Not found");
        }
    }
    else{
        console.log("User NU gasit");
        res.status(404).send("Not found");
    }
}

export { getAllCabinete, createAccount, getLogin};