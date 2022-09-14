const trails = [
    {
        id: 1,
        title: "GAMING",
        distance: "gaming",
        location: "gaming",
        region: "gaming",
        picture: "gaming"
    },
    {
        id: 2,
        title: "CAVEMAN",
        distance: "Caveman",
        location: "Caveman",
        region: "Caveman",
        picture: "Caveman"
    }     
];


exports.getAll = function(req,res){
    res.send(trails)
}

exports.createNew = (req,res) =>{
    const length = trails.push(req.body)
    trails[length-1] = {id: trails[length-2].id+1,...trails[length-1]}
    res.status(201).json(trails[length-1])

}

exports.getById = function(req,res){
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    let result = trails.find(x => x.id === parseInt(req.params.id));

    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }

    res.send(result);
}

exports.editById = function(req,res){
    
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    const index = trails.findIndex(x => x.id === parseInt(req.params.id));

    if (index === -1) {
        res.status(404).send({error: "trail not found"});
    }

    trails[index] = {...trails[index],...req.body}

    res.status(200).json(trails[index])
}

exports.deleteById = function(req,res){
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    let result = trails.find(x => x.id === parseInt(req.params.id));

    const index = trails.findIndex(x => x.id === parseInt(req.params.id));
    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }

    trails.splice(index,1)
    res.status(204).send();

}