const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../Model/AuthModel')
const jwt = require('jsonwebtoken')

//user registration
const userRegistration = async (req,res) =>{

    try{

        const {fName,lName,email,password} = req.body;

        //check iff the user is already registered
        let user = await User.findOne({email})
        if(user){
           return res.status(400).json({message:"User already exist."})
        }

        //hash passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //create new user
        user = new User({fName,lName,email,password:hashedPassword})

        await user.save();

        res.status(201).json({message:"User registered successfully"})

    } catch(error){
        res.status(500).json({messsage:"Error.Try again.",error})
    }
     
}

//user login
const loginUser = async(req,res) =>{
    try{

        const {email,password} = req.body;

        let user = User.findOne({email})
        if(!user){
            res.status(400).json({message:"Invalid email or password."})
        }

        //compare entered password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid email or password."})
        }

        //generate jwt token for frontend authentication
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )
        res.status(200).json({message:"User login successfully."})
    } catch(error){
        res.status(500).json({message:"Server error ",error})
    }
}

//update profile
const updateUser = async(req,res) =>{

    try{

        const userId = req.params.id;
        const{fName,lName,mobileNo,password} = req.body;

        let user = await User.findById(userId)
        if(!user){
            res.status(404).json({message:"User not found."})
        }

        //update fields if provided
        //user.fName mean existing value in db and fName mean newly added value
        if(fName) user.fName = fName;
        if(lName) user.lName = lName;
        if(mobileNo) user.mobileNo = mobileNo;

        if(password){
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password,salt)
        }

        await user.save()

        res.status(200).json({message:"Successfully updated."})

    } catch(error){
        res.status(500).json({message:"Server error ",error})
    }
}

//fetch user details
const fetchDetail = async(req,res) =>{

    try{

        const userId = req.params.id;
        
        let user = await User.findById(userId).select("-password");
        if(!user){
            res.status(404).json({message:"User not found"})
        }

        res.status(200).json({user})

    } catch(error){
        res.status(500).json({message:"Server error ",error})
    }
}


module.exports = {userRegistration,loginUser,updateUser,fetchDetail}