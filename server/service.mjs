async function getAllCabinete(model, req, res) {
    const cabinete = await model.findAll();
    if(cabinete){
        res.status(201).send(cabinete) ;
    }
    else{
        res.status(404).send("Not found");
    }
}

export { getAllCabinete};