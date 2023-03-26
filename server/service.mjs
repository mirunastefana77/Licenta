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
        const user = await modelUser.create({
            unitate_invatamant: scoala,
            nume_user: nume,
            prenume_user: prenume,
            email_user: email,
            parola_user: password,
            tip_user: rol
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

export { getAllCabinete, createAccount};