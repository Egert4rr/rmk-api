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

