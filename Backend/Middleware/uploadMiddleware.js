//Multer is a tool used in Node.js (especially with Express) to handle file uploads — like when a user wants to upload a profile picture or a document through a form.

const multer = require('multer')

//This means the file will be saved in your RAM
const storage = multer.memoryStorage()
const upload = multer({storage})

module.exports = upload;