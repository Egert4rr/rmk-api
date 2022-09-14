const mongoose = require('mongoose');
const Trail  = mongoose.model("trail");

exports.getAll = function(req,res){
    Trail.find({},(err,trail) =>{
        if(err){
            res.status(400).send(err);
        }
        else{
            res.json(trail);
        }
    })

}

exports.createNew = (req,res) =>{
    const newTrail = new Trail(req.body)
    newTrail.save((err,trail)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.status(201).json(trail)
        }
    }) 
}
    



exports.getById = function(req,res){
    

}


exports.editById = function(req,res){
    

}
exports.deleteById = function(req,res){
    

}
/*
  .post(trailsList.createNew);    //create

    app.route("/trails/:id")
        .get(trailsList.getById)        //read
        .put(trailsList.editById)       //update
        .delete(trailsList.deleteById)  //delete
*/ 
