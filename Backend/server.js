const express = require('express');
require('dotenv').config();
const connectDB = require('./Config/Database')
const AuthRoutes = require('./Routes/AuthRoute')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

//routes
app.use("/api/user",AuthRoutes);

connectDB();

app.listen(PORT, (error) =>{

    if(!error){
        console.log("Server run successfully on port " + PORT);
    } else{
        console.log("Error occcured ",error)
    }

})