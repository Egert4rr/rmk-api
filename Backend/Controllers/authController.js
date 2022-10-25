require("dotenv").config()
const mongoose = require("mongoose")
const hiker = mongoose.model("hiker")
const jwt = require("jsonwebtoken")
const utils = require("../utils")

exports.loginUser = async (req, res, next) => {
    let { email, password } = req.body;    

    console.log(req.body);
    let existingHiker;
    try {
        existingHiker = await hiker.findOne({ email: email });
        console.log(existingHiker);
    } catch (err) {
        console.log("Find: ",err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    if (!existingHiker || !utils.verifyPassword(password,existingHiker.password)) {
        console.log("User: ",existingHiker);
        console.log("Pass: ",password);
        const error = new Error("Wrong details please check at once");
        return next(error);
    }
    let token;
    try {
        //Creating jwt token
        token = jwt.sign(
        { userId: existingHiker.id, email: existingHiker.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );
    } catch (err) {
        console.log("JWT: ",err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    res.status(200)	
        .json({
        success: true,
        data: {
            userId: existingHiker.id,
            email: existingHiker.email,
            token: token,
        },
        })
}
exports.registerUser = async (req, res, next) => {
    let { name, email, phonenumber, password } = req.body;
    password = await utils.hashPassword(password)
    const newHiker = hiker({
        name,
        email,
        phonenumber,
        password,
    });
    try {
        await newHiker.save()
    } catch (e) {
        console.log("Save: ",e);
        const error = new Error("Error! Something went wrong.")
        return next(error)
    }
    let token;
    try {
        token = jwt.sign(
        { userId: newHiker.id, email: newHiker.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );
    } catch (err) {
        console.log("Token: ",err);
        const error = new Error("Error! Something went wrong.")
        return next(error);
    }
    res
        .status(201)
        .json({
        success: true,
        data: { userId: newHiker.id,
            email: newHiker.email, token: token },
        })
}