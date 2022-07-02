const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./Routes/user');
const registrationRoute = require('./Routes/registration');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/user',userRoute);
app.use('/registration' ,registrationRoute);
app.listen(3001 , ()=>{
    console.log("Yo bro,running server");
});
