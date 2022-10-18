const { faker } = require('@faker-js/faker');
/*
const hikes = [
    {
        id: 1,
        name: "GAMING",
        organizer: "gaming",
        organizerEmail: "gaming@gmaing.com",
        plannedTrails:["gaming"],
        startingDate:  new Date(""),
        startingLocation: "gaming"
       
    },
    {
        id: 1,
        name: "CAVEMAN",
        organizer: "caveman",
        organizerEmail: "gaming@gmaing.com",
        plannedTrails:["caveman"],
        startingDate:  new Date(""),
        startingLocation: "caveman"
       
    }     
];
*/
const hikes = [];

for (let i = 0; i < 20; i++) {
    hikes.push({
            id: i + 1,
            name: faker.name.jobTitle(),
            organizer: faker.name.fullName(),
            organizerEmail: faker.internet.email(),
            plannedTrails:[faker.name.lastName(), faker.name.lastName()],
            startingDate:  new Date(faker.date.between()),
            startingLocation: faker.address.streetAddress(false)
        })
}


exports.getAll = function(req,res){
    res.send(hikes)
}

exports.createNew = (req,res) =>{
    const length = hikes.push(req.body)
    hikes[length-1] = {id: hikes[length-2].id+1,...hikes[length-1]}
    res.status(201).json(hikes[length-1])

}

exports.getById = function(req,res){
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    let result = hikes.find(x => x.id === parseInt(req.params.id));

    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }

    res.send(result);
}

exports.editById = function(req,res){
    
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    const index = hikes.findIndex(x => x.id === parseInt(req.params.id));

    if (index === -1) {
        res.status(404).send({error: "trail not found"});
    }

    hikes[index] = {...hikes[index],...req.body}

    res.status(200).json(hikes[index])
}

exports.deleteById = function(req,res){
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    let result = hikes.find(x => x.id === parseInt(req.params.id));

    const index = hikes.findIndex(x => x.id === parseInt(req.params.id));
    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }

    hikes.splice(index,1)
    res.status(204).send();

}