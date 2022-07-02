const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "cplab"
});
userExists = (username)=>{
    
}
router.post('/', (req, res) => {
    let user = req.body;
    console.log(user.reg);
    db.query("INSERT INTO logininfo (username, password , email) VALUES (?, ?, ?)" , [user.userName,user.password,user.email]);
    db.query("INSERT INTO student (username, regNo, name, phoneNo) VALUES (?, ?, ?, ?)" , [user.userName,user.reg,user.name,user.phone]);
    res.send('Hello World!')
    
})

module.exports = router;