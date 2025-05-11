const mongoose = require('mongoose');

//create schema
const userSchema = new mongoose.Schema({
    fName: {type:String, required: true},
    lName: {type:String, required:true},
    email: {type:String, unique:true, required:true},
    mobileNo: {type:String},
    password: {type:String, required:true},
    profileImage: {data: Buffer, contentType: String},
    userQuote: {type:String, default:""},
    coverImage: {data: Buffer, contentType: String}
})

//create model
const User = mongoose.model("User",userSchema)

module.exports = User;