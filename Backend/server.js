const express = require('express');
require('dotenv').config();
const connectDB = require('./Config/Database')
const AuthRoutes = require('./Routes/AuthRoute')
const TaskRoutes = require('./Routes/TaskRoutes')
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors({ 
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type,Authorization',
  }));

  
//routes
app.use("/api/user",AuthRoutes);
app.use("/api/task",TaskRoutes);


connectDB();

app.listen(PORT, (error) =>{

    if(!error){
        console.log("Server run successfully on port " + PORT);
    } else{
        console.log("Error occcured ",error)
    }

})