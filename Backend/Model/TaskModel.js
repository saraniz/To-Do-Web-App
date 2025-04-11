const mongoose = require('mongoose')

//create task schema
const taskSchema = new mongoose.Schema({
    taskName: {type:String, required:true},
    taskDescription: {type:String, required:true},
    priority: {type:String, required:true},
    status: {type:String, required:true},
    dueDate: {type:Date},
    color: {type:String},
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
})

//define model
new Task = mongoose.model("Task",taskSchema)

module.exports = Task;