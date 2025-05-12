const express = require("express");
const Task = require("../Model/TaskModel");
const User = require("../Model/AuthModel");
const jwt = require("jsonwebtoken");

const addTask = async (req, res) => {
  try {
    //get user id from authmiddleware[JWT token]
    const userId = req.user.id;
    const { taskName, taskDescription, priority, status, dueDate, endDate, color } = req.body;

    //findbyid expects only a single ID as an argument. {userid} is like a object so not just string
    let user = await User.findById( userId );
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const task = new Task({
      taskName,
      taskDescription,
      priority,
      status,
      dueDate,
      endDate,
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

    let tasks = await Task.find({user: userId})
    console.log("TASK: ",tasks)

    res.status(200).json({tasks})

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

//search tasks
const searchTasks = async (req,res) => {

  try{

    //Get the value from the body
    const searchTerm = req.body.term
    const userId = req.user.id;

    const user = await User.findById(userId)
    if(!user){
      return res.status(401).json({message: "User not found.Please logged in."})
    }

    //in here $regex search for the text that matches this pattern. it helps you find things even if it is part of the word.
    //$option is used together with $regex to control how the search behaves. in here 'i' stands for the ignore case.
    //It tells MongoDB to not care about uppercase or lowercase when matching text.
    //we can use without regex like this, const results = await Task.find({name: searchTerm})
    const results = await Task.find({
      user: userId,
      taskName : {$regex: searchTerm, $options : 'i'}
    })

    res.json(results)
  } catch(error){
    res.status(500).json({ error: 'Internal server error' });
  }
}

//delet tasks
const deleteTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    console.log("TASKID: ", taskId);

    // Find the user
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." }); // Changed to 404
    }

    // Delete the task associated with the user
    const deleted = await Task.findOneAndDelete({ _id: taskId, user:userId });
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" }); // Changed to 404
    }

    return res.status(200).json({ message: "Task deleted successfully", taskId: taskId }); // Only return taskId
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { addTask,fetchTasks,updateTasks,deleteTask,searchTasks,deleteTasks};
