const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../Model/AuthModel");
const jwt = require("jsonwebtoken");
const { use } = require("../Routes/AuthRoute");

//user registration
const userRegistration = async (req, res) => {
  try {
    const { fName, lName, email, password } = req.body;

    //check if the user is already registered
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist." });
    }

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    user = new User({ fName, lName, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ messsage: "Error.Try again.", error });
  }
};

//user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password." });
    }

    //compare entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password." });
    }

    //generate jwt token for frontend authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User login successfully.", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error ", error });
  }
};

//update profile
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("uid: ", userId);
    const { fName, lName, mobileNo, password, newPassword,userQuote } = req.body;

    let user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log("user: ", req.user);
    console.log("body: ", req.body);

    //update fields if provided and valid
    //user.fName mean existing value in db and fName mean newly added value
    if (typeof fName === "string" && fName.trim()) {
      user.fName = fName.trim();
    }

    if (typeof lName === "string" && lName.trim()) {
      user.lName = lName.trim();
    }

    if (typeof mobileNo === "string") {
      user.mobileNo = mobileNo;
    }

    if(typeof userQuote === "string"){
      user.userQuote = userQuote;
    }

    // Password update logic
    if (newPassword && newPassword.trim() !== "") {
      // Ensure current password is provided
      if (!password || password.trim() === "") {
        return res.status(400).json({ message: "Enter your current password" });
      }

      // Check if current password matches the stored password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Your current password is incorrect" });
      }

      // Check if new password length is at least 6 characters
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "New password must be at least 6 characters." });
      }

      // Check for password strength (e.g., at least one uppercase letter, one number, and one special character)
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res
          .status(400)
          .json({
            message:
              "New password must contain at least one uppercase letter, one number, and one special character.",
          });
      }

      // Hash the new password and update the user's password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      // Save the updated user
    }

    //profile picture handle
    //req.file = This is the uploaded file object added by multer.
    if(req.file){
      user.profileImage = {
        data: req.file.buffer, //the binary data of the uploaded file or image
        contentType: req.file.mimetype, //type of the file
      }
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fName: user.fName,
      lName: user.lName,
      mobileNo: user.mobileNo,
      userQuote: user.userQuote,
    };

    res
      .status(200)
      .json({ message: "Successfully updated.", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error.stack); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//fetch user details
const fetchDetail = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error ", error });
  }
};

//upload cover image
const uploadCoverImage = async(req,res) => {

  try{

    const userId = req.user.id;

    let user = await User.findById(userId);
    if(!user){
      res.status(404).json({message: "User not found."})
    }

    if (req.file) {
      user.coverImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    
      console.log("CI: ", req.file); // fixed typo: 'file' => 'req.file'
    }
    

    const coverImageUpload = {
      coverImage: user.coverImage,
    }


    await user.save()

    res.status(200).json({message: "Cover image uploaded successfully", coverImage: coverImageUpload})
  } catch(error){

    res.status(500).json({message:"Server error."})
  }
}



module.exports = { userRegistration, loginUser, updateUser, fetchDetail,uploadCoverImage };
