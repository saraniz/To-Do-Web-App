const mongoose = require('mongoose');

//create schema
const userSchema = new mongoose.Schema({
    fName: {type:String, required: true},
    lName: {type:String, required:true},
    email: {type:String, unique:true, required:true},
    mobileNo: {type:Number},
    password: {type:String, required:true},
    profileImage: {type:String},
    userQuote: {type:String}
})

//create model
const User = mongoose.model("User",userSchema)

module.exports = User;