const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrailSchema = new Schema({
    title:{
        type:String,
        required:"Trail name is mandatory"
    },

    distance:{
        type:String,
        required:"Distance is mandatory"
    },
    location:{
        type:String,
        required:"location is mandatory"

    },
    region:{
        type:String,
        required:"region is mandatory"

    },
    picture:{
        type:String,
        required:"Picture is mandatory"

    },
    tags:[
        {
            telkimisvõimalus:Boolean,
            kattegaLõke:Boolean,
            lõkkekoht:Boolean,
            _id:false
        }
    ],
    hike:{
        type:Schema.Types.ObjectId,
        ref:"hike"
    },
    description:{
        type:String,
        required:"Description is mandatory"
    }


});


module.exports = mongoose.model('trail',TrailSchema);
