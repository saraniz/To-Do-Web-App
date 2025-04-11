const jwt = require('jsonwebtoken')
require("dotenv").config()
const express = require('express')
const User = require('../Model/AuthModel')

//authentication middleware
const authMiddleware = async (req,res,next)=>{
    try{
    //get the token from autherization header
    //?. mean it prevents errors if authorization is missing.code won't crash and will return undefined.
    //.split(" ") mean splits the string into an array
    //[1] mean extracts the second part of the array(the actual JWT token)
    const token = req.header("Authorization")?.split(" ")[1]
    //    const token = req.header("Authorization")?.split(" ")[1]:undefined  


    if(!token){
        return res.status(401).json({message:"Access denied.No token provided."})
    }

    
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //fetch user from the database
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({ message: "User not found. Please log in again." });
        }

        //attach user data to request
        req.user = decoded;
        next()
    } catch(error){
        res.status(401).json({message:"Invalid or expired token."})
    }

}

module.exports = authMiddleware;