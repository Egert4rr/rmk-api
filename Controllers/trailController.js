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
    trail.findById(req.params.id)
        .then(doc => {
            if(doc === null){
                res.status(404).send("Trail not found")
            }
            else{res.json(doc);}
        })
}