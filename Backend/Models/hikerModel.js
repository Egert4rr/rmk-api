const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HikerSchema = new Schema({
    Name:{
        type:String,
        required:"Name is mandatory"
    },
    Email:{
        type:String,
        required:"Email"
    },
    Phonenumber:{
        type:Number
    }
    

});

module.exports = mongoose.model('hiker',HikerSchema);

