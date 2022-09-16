const mongoose = require('mongoose');
const Trail  = mongoose.model("trail");
const trail = require("../Models/trailModel")


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
        else{
            res.status(201).send(trail)
        }
    }) 
}

exports.getById = function(req,res){
    /*if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }*/
    /*
    let result = trail.findOne(x => x._id === req.params.id);

    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }
    res.send(result);
    */
}

exports.editById = function(req,res){
    /*
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    const index = mongoose.findIndex(x => x.id === parseInt(req.params.id));

    if (index === -1) {
        res.status(404).send({error: "trail not found"});
    }

    hikes[index] = {...hikes[index],...req.body}

    res.status(200).json(hikes[index])
*/
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
