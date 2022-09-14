const hikers = [
    {
        id: 1,
        name: "GAMING",
        email: "gaming",
        phoneNumber: 5569817
       
    },
    {
        id: 2,
        name: "CAVEMAN",
        email: "caveman",
        phoneNumber: 55685135
       
    }     
];



exports.getAll = function(req,res){
    res.send(hikers)
}

exports.createNew = (req,res) =>{
    const length = hikers.push(req.body)
    hikers[length-1] = {id: hikers[length-2].id+1,...hikers[length-1]}
    res.status(201).json(hikers[length-1])

}

exports.getById = function(req,res){
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    let result = hikers.find(x => x.id === parseInt(req.params.id));

    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }

    res.send(result);
}

exports.editById = function(req,res){
    
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    const index = hikers.findIndex(x => x.id === parseInt(req.params.id));

    if (index === -1) {
        res.status(404).send({error: "trail not found"});
    }

    hikers[index] = {...hikers[index],...req.body}

    res.status(200).json(hikers[index])
}

exports.deleteById = function(req,res){
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    let result = hikers.find(x => x.id === parseInt(req.params.id));

    const index = hikers.findIndex(x => x.id === parseInt(req.params.id));
    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }

    hikers.splice(index,1)
    res.status(204).send();

}