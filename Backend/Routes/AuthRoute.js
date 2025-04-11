const express = require('express')
const {userRegistration,loginUser,updateUser,fetchDetail} = require('../Controller/AuthController')
const authMiddleware = require('../Middleware/AuthMiddleware')

const  router = express.Router();

router.post("/register",userRegistration)
router.post("/login",authMiddleware,loginUser)
router.put("/update/:id",authMiddleware,updateUser)
router.get("/fetchdetail/:id",authMiddleware,fetchDetail)

module.exports = router;