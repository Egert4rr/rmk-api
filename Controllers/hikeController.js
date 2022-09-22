const hike = require("../Models/hikeModel")

/*exports.getAll = function(req,res){
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
}*/