const express = require("express");
const mysql = require("mysql");
const router = express.Router();
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: "",
  database: process.env.DB_NAME,
});
module.exports = {
  getlogininfoByUsername: function (username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM logininfo WHERE username = ?",
        [username],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getlogininfoByEmail: function (email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM logininfo WHERE email = ?",
        [email],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  insertLoginInfo: function (userName, password, email) {
    db.query(
      "INSERT INTO logininfo (username, password , email) VALUES (?, ?, ?)",
      [userName, password, email]
    );
  },
  insertStudentInfo: function (userName, reg, name, phone) {
    db.query(
      "INSERT INTO student (username, regNo, name, phoneNo) VALUES (?, ?, ?, ?)",
      [userName, reg, name, phone]
    );
  },
  getStudentInfo: function (username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM student WHERE username = ?",
        [username],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};
