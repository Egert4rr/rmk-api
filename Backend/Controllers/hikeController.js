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

            res.status(200).json(hikes)
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
        else{res.status(200).send(hike)}
    })
}

exports.getById = function(req,res){
    hike.findById(req.params.id,(err,result)=>{
        if(err){
            res.status(400).json(err.message)
        }
        if(result === null){
            res.status(404).json("Hike not found")
        }
        else{res.status(200).json(result);} 
    })
}

exports.editById = function(req,res){

    hike.updateOne({_id: req.params.id}, req.body, (err, result) => {
        if(err) {
            res.status(400).json(err.message)
        }else if(result.matchedCount == 0) {
            res.status(404).json("hike not found")
        }else {
            res.status(202).json("Successfully updated")
        } 
    })
}

exports.deleteById = function(req,res){    
    hike.deleteOne({_id: req.params.id}, (err, result) => {
        if(err) {
            res.status(400).json(err.message)
        }else if(result.deletedCount == 0) {
            res.status(404).json("hike not found")
        }else {
            console.log(result);
            res.status(202).json("Successfully deleted")
        }
    })
}