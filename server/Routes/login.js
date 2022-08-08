const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: "",
  database: process.env.DB_NAME,
});
router.post("/", (req, res) => {
  let username = req.body.userName;
  let password = req.body.password;
  let userExists = queries.getlogininfoByUsername(username);
  userExists
    .then(async (result) => {
      if (result.length === 0) {
        res.send("1");
      } else {
        let hash = result[0].password;
        console.log(hash);
        let match = await helper.compareHash(password, hash);
        if (match) {
          let studentinfo = queries.getStudentInfo(username);
          studentinfo.then((student) => {
            if (student.length === 0) {
              res.send("3");
            } else {
              let user = {
                userName: result[0].username,
                email: result[0].email,
                name: student[0].name,
                phone: student[0].phoneNo,
                reg: student[0].regNo,
              };
              res.send(helper.encryptData(user, process.env.SECRET_KEY));
            }
          });
        } else {
          res.send("2");
        }
      }
    })
    .catch(() => {
      res.send("3");
    });
});
module.exports = router;
