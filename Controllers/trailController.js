const trail = require("../Models/trailModel")

exports.getAll = function(req,res){
    trail.find({},(err,trail) =>{
        if(err){
            res.status(400).send(err);
        }
        else{
           let trails = []
            trail.forEach(element => {
                let newTrail = {
                    _id: element._id,
                    title: element.title
                }
                trails.push(newTrail);
            });

            res.json(trails)
        }
    })
}

exports.createNew = (req,res) =>{
    const newTrail = new trail({
        title: req.body.title,
        distance: req.body.distance,
        location: req.body.location,
        region: req.body.region,
        picture: req.body.picture
    })
    newTrail.save((err,trail)=>{
        if(err){
            res.status(400).send(err)
        }
        else{res.status(201).send(trail)}
    }) 
}

exports.getById = function(req,res){
    trail.findById(req.params.id,(err,result)=>{
        if(err){
            res.status(400).send(err.message)
        }
        if(result === null){
            res.status(404).send("Trail not found")
        }
        else{res.status(200).json(result);} 
    })
}

exports.editById = function(req,res){
    trail.updateOne({_id: req.params.id}, req.body, (err, result) => {
        if(err) {
            res.status(404).send(err.message)
        }else if(result.matchedCount == 0) {
            res.status(404).send("Trail not found")
        }else {
            res.status(202).send("Successfully updated")
        } 
    })
}

exports.deleteById = function(req,res){    
    trail.deleteOne({_id: req.params.id}, (err, result) => {
        if(err) {
            console.log(err);
            res.status(404).send(err.message)
        }else if(result.deletedCount == 0) {
            res.status(404).send("Trail not found")
        }else {
            console.log(result);
            res.status(202).send("Successfully deleted")
        }
    })
}