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

            res.json(hikers)
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
        else{res.status(201).send(hiker)}
    })
}

exports.getById = function(req,res){
    hiker.findById(req.params.id)
        .then(doc => {
            if(doc === null){
                res.status(404).send("Hiker not found")
            }
            else{res.json(doc);} 
        })
}

exports.editById = function(req,res){

    hiker.updateOne({_id: req.params.id}, req.body)
        .then(doc =>{ res.status(202).send("successfully updated")})
        .catch(err => {res.status(404).send(err, {error:"Hiker not found"})})
}

exports.deleteById = function(req,res){    
    /*hiker.deleteOne({_id: req.params.id})
        .then(
            (doc) =>{
                if(doc.deletedCount == 0){
                    res.status(404).json({error: "Hiker not found"});        
                }
                else{res.status(202).send("successfully deleted")}
            }
        )*/
}