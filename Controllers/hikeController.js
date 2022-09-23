const hike = require("../Models/hikeModel")

exports.getAll = function(req,res){
    hike.find({},(err,hike) =>{
        if(err){
            res.status(400).send(err);
        }
        else{
           let hikes = []
            hike.forEach(element => {
                let newHike = {
                    _id: element._id,
                    Name: element.Name
                }
                hikes.push(newHike);
            });

            res.json(hikes)
        }
    })
}

exports.createNew = (req,res) =>{
    const newHike = new hike({
        Name: req.body.Name,
        Organizer: req.body.Organizer,
        OrganizerEmail: req.body.OrganizerEmail,
        PlannedTrails: req.body.PlannedTrails,
        StartDate: req.body.StartDate,
        Startinglocation: req.body.Startinglocation
    })
    newHike.save((err,hike)=>{
        if(err){
            res.status(400).send(err)
        }
        else{res.status(201).send(hike)}
    })
}

exports.getById = function(req,res){
    /*hike.findById(req.params.id)
        .then(doc => {
            if(doc === null){
                res.status(404).send("Hike not found")
            }
            else{res.json(doc);} 
        })*/
}

exports.editById = function(req,res){

    /*trail.updateOne({_id: req.params.id}, req.body)
        .then(doc =>{ res.status(202).send("successfully updated")})
        .catch(err => {res.status(404).send(err, {error:"Trail not found"})})*/
}

exports.deleteById = function(req,res){    
    /*trail.deleteOne({_id: req.params.id})
        .then(
            (doc) =>{
                if(doc.deletedCount == 0){
                    res.status(404).json({error: "trail not found"});        
                }
                else{res.status(202).send("successfully deleted")}
            }
        )*/
}