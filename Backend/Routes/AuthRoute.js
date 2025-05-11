const express = require('express')
const {userRegistration,loginUser,updateUser,fetchDetail, uploadCoverImage} = require('../Controller/AuthController')
const authMiddleware = require('../Middleware/AuthMiddleware');
const upload = require('../Middleware/uploadMiddleware');

const  router = express.Router();

router.post("/register",userRegistration)
router.post("/login",loginUser)
router.put("/update",authMiddleware,upload.single("profileImage"),updateUser)
router.get("/fetchdetail",authMiddleware,fetchDetail)
router.put("/coverimage",authMiddleware,upload.single("coverImage"),uploadCoverImage)

module.exports = router;