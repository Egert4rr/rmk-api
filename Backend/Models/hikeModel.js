const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
    Name:{
        type:String,
        required:"Name is mandatory"
    },

    Organizer:{
        type:Schema.Types.ObjectId,
        //required:"Organizer is mandatory"
    },

    PlannedTrails:{
        type: [Schema.Types.ObjectId]
        //required:"At least one trail is mandatory"
    },
    StartDate:{
        type:Date,
        required:"Start Date is mandatory"
    },
    Startinglocation:{
        type:String,
        required:"Start location is mandatory"
    },

    Regions:{
        type:Array,
    }


});

module.exports = mongoose.model('hike',HikeSchema);