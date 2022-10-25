const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const HikerSchema = new Schema({
    name:{
        type:String,
        required:"Name is mandatory"
    },
    email:{
        type:String,
        required:"Email",
        unique : true
        },
    phonenumber:{
        type:Number
    },
    password:{
        type:String,
        required:"Password is mandatory"
    }
    

});

HikerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

module.exports = mongoose.model('hiker',HikerSchema);

