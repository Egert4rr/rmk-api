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
                    Name: element.Name,
                    Organizer:element.Organizer,
                    PlannedTrails:element.PlannedTrails,
                    StartDate:element.StartDate,
                    Startinglocation:element.Startinglocation,
                    Regions:element.Regions,
                }
                hikes.push(newHike);
            });

            res.status(200).json(hikes)
        }
    })
}

exports.createNew = (req,res) =>{
    const startDate = new Date(req.body.StartDate)
    let dateMinutes = startDate.getMinutes();
    let dateMonth = startDate.getMonth()
    let dateDay = startDate.getDate()
    let dateHours = startDate.getHours()
    if (dateMinutes < 10) {
        dateMinutes = "0" + dateMinutes
    }
    if (dateMonth < 10) {
        dateMonth = "0" + dateMonth
    }
    if (dateDay < 10) {
        dateDay = "0" + dateDay
    }
    if (dateHours < 10) {
        dateHours = "0" + dateHours
    }
    const DateString = `${startDate.getFullYear()}.${dateMonth}.${dateDay} ${dateHours}:${dateMinutes}`
    const newHike = new hike({
        Name: req.body.Name,
        Organizer: req.body.Organizer,
        PlannedTrails: req.body.PlannedTrails,
        StartDate: DateString,
        Startinglocation: req.body.Startinglocation,
        Regions: req.body.Regions
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

exports.getByRegion = function(req,res){
    const regions = [];
    try {
        req.body.regions.forEach(element => {
            regions.push(element)
        })
    }
    catch (error) {
        res.status(404).send("No regions found")
        return
    }

    hike.find({ Regions: { $in: regions } }, (err, hikes) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.status(200).json(
                { filteredHikes: hikes }
            )
        }
    })
}

exports.getByUser = function(req,res){
    const user = req.body.userId

    hike.find({ Organizer:  user  }, (err, hikes) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.status(200).json(
                { dropdownHikesList: hikes }
            )
        }
    })
}


exports.addUserHike = function(req,res){

    console.log("add User hike controller")
    //otsi hike id'ga kasutades modalin
      hike.findById(req.body.hikeId,(err,result)=>{
        if(err){
            res.status(400).json(err.message)
        }
        if(result === null){
            res.status(404).json("Hike not found")
        }
        else{
            const id = req.body.trailId
            const region = req.body.region
            
            let regions = result.Regions
            let trails = result.PlannedTrails
            regions.push(region)
            trails.push(id)
            result.updateOne({PlannedTrails:trails, Regions:regions});
            result.save()
        } 
    })
   

}
