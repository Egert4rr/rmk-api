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

 trail.findById(req.params.id)
    .then(doc => {
        res.json(doc);

    }).catch(err => {
        res.status(404).send({error: "trail not found"});
    })

}

exports.editById = function(req,res){

    trail.findOne({title:"gfgdff"}).
    then(doc => trail.updateOne({_id:"632999e5bd7c0efa593766c4"}, {title: "gaming"})).
    then(doc => res.send(doc))
    



    /*if (trail.findById(x => x._id === req.params.id)) {
        const doc = trail.findOne(req.params.id)
        doc.update(req.body)
        res.status(200).send("Updated successfully")
    }else {
        res.status(404).send({error: "trail not found"});
    }*/

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
