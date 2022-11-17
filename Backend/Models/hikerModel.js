const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const HikerSchema = new Schema({
    name:{
        type:String,
        required:"Name is mandatory",
    },
    email:{
        type:String,
        required:"Email is mandatory",
        unique : true
        },
    phonenumber:{
        type:String,
        require:"Phonenumber is mandatory"
    },
    password:{
        type:String,
        required:"Password is mandatory"
    },
    isAdmin:{
        type:Boolean,
    }

});

module.exports = mongoose.model('hiker',HikerSchema);

