const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
    Name:{
        type:String,
        required:"Name is mandatory"
    },

    Organizer:{
        type:String,
        required:"Organizer is mandatory"
    },
    OrganizerEmail:{
        type:String,
        required:"Organizer email is mandatory"
    },

    PlannedTrails:{
        type:Array,
        required:"trails are mandatory"
    },
    StartDate:{
        type:Date,
        //required:"Start Date is mandatory"
    },
    Startinglocation:{
        type:String,
        required:"Start location is mandatory"

    }

});

module.exports = mongoose.model('hike',HikeSchema);

