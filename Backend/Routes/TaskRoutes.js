const express = require('express')
const {addTask, fetchTasks, searchTasks, deleteTasks} = require('../Controller/TaskController')
const authMiddleware = require('../Middleware/AuthMiddleware')

const router = express.Router()

router.post('/addtask',authMiddleware,addTask)
router.get('/fetchtask',authMiddleware,fetchTasks)
router.post('/search',authMiddleware,searchTasks)
router.delete('/delete/:taskId',authMiddleware,deleteTasks)

module.exports = router;