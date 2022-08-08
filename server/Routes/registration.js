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
router.get("/userExists", (req, res) => {
  let username = req.query.username;
  res.send(userExists(username));
});
router.post("/", (req, res) => {
  let user = req.body;
  let userExists = queries.getlogininfoByUsername(user.userName);
  userExists
    .then((result) => {
      if (result.length === 0) {
        let emailExists = queries.getlogininfoByEmail(user.email);
        emailExists
          .then((result) => {
            if (result.length === 0) {
              helper
                .hashPassword(user.password, process.env.SALT_ROUNDS)
                .then((hash) => {
                  queries.insertLoginInfo(user.userName, hash, user.email);
                  queries.insertStudentInfo(
                    user.userName,
                    user.reg,
                    user.name,
                    user.phone
                  );
                  res.send(
                    helper.encryptData(
                      {
                        userName: user.username,
                        email: user.email,
                        name: user.name.name,
                        phone: user.phone,
                        reg: user.reg,
                      },
                      process.env.SECRET_KEY
                    )
                  );
                })
                .catch((err) => {
                  console.log("hashing error");
                  res.send("3");
                });
            } else {
              res.send("2");
            }
          })
          .catch((err) => {
            console.log(err);
            res.send("3");
          });
      } else {
        res.send("1");
      }
    })
    .catch((err) => {
      console.log("dhurru");
      res.send("3");
    });
});
module.exports = router;
