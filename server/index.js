const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "project"
});


app.post("/login",(req , res) => {
    console.log(db.query(
        "SELECT * FROM users WHERE username = ?",[req.body.username],(err,result)=>{
            console.log(result);
        }
    ));
});
 
app.listen(3001 , ()=>{
    console.log("Yo bro,running server");
});
