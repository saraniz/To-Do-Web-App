const express = require("express");
const Task = require("../Model/TaskModel");
const User = require("../Model/AuthModel");
const jwt = require("jsonwebtoken");

const addTask = async (req, res) => {
  try {
    //get user id from authmiddleware[JWT token]
    const userId = req.user.id;
    const { taskName, taskDescription, priority, status, dueDate, color } = req.body;

    let user = await User.findById({ userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const task = new Task({
      taskName,
      taskDescription,
      priority,
      status,
      dueDate,
      color,
      user: userId,
    });

    await task.save();

    res.status(200).json({ message: "Task created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error ", error });
  }
};

//fetch tasks
const fetchTasks = async(req,res) =>{

  try{

    const userId = req.user.id;

    let user = await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"User not found."})
    }

    res.status(200).json({user:userId})

  }catch(error){
    res.status(500).json({message:"Server error ",error})
  }
}

//update tasks
const updateTasks = async(req,res) => {

  try{

    const userId = req.user.id;
    const taskId = req.params.id;
    const updates = req.body;

    const task = await Task.findOne({_id:taskId,user:userId})
    if(!task){
      return res.status(404).json({message:"Task not found."})
    }

    Object.assign(Task,updates)

    await task.save()
    res.status(200).json({ message: "Task updated successfully.", task });


  } catch(error){
    res.status(500).json({message:"Server error ",error})
  }
}

//delete tasks
const deleteTask = async(req,res) =>{
  try{

     const userId = req.user.id;
     const taskId = req.params.id;

     const task = await Task.findOneAndDelete({_id:taskId, user:userId})
     if(!task){
      return res.status(404).json({message:"Task not found."})
     }

     res.status(200).json({message:"Task delete successfully ",task})
  } catch(error){
    res.status(500).json({message:"Server error ",error})
  }
}

module.exports = { addTask,fetchTasks,updateTasks,deleteTask};
