const hiker = require("../Models/hikerModel")

exports.getAll = function(req,res){
    hiker.find({},(err,hiker) =>{
        if(err){
            res.status(400).send(err);
        }
        else{
           let hikers = []
            hiker.forEach(element => {
                let newHiker = {
                    _id: element._id,
                    Name: element.Name
                }
                hikers.push(newHiker);
            });

            res.status(200).json(hikers)
        }
    })
}

exports.createNew = (req,res) =>{
    const newHiker = new hiker({
        Name: req.body.Name,
        Email: req.body.Email,
        Phonenumber: req.body.Phonenumber
    })
    newHiker.save((err,hiker)=>{
        if(err){
            res.status(400).send(err)
        }
        else{res.status(200).send(hiker)}
    })
}

exports.getById = function(req,res){
    hiker.findById(req.params.id, (err,result)=>{
        if(err){
            res.status(400).json(err.message)
        }
        if(result === null){
            res.status(404).json("Hiker not found")
        }
        else{res.status(200).json(result);} 
    })
}

exports.editById = function(req,res){

    hiker.updateOne({_id: req.params.id}, req.body, (err, result) => {
        if(err) {
            res.status(400).json(err.message)
        }else if(result.matchedCount == 0) {
            res.status(404).json("Hiker not found")
        }else {
            res.status(202).json("Successfully updated")
        } 
    })
}

exports.deleteById = function(req,res){
    hiker.deleteOne({_id: req.params.id}, (err, result) => {
        if(err) {
            res.status(400).json(err.message)
        }else if(result.deletedCount == 0) {
            res.status(404).json("Hiker not found")
        }else {
            console.log(result);
            res.status(202).json("Successfully deleted")
        }
    })
}