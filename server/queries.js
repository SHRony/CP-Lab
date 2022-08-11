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
            console.log(err);
            reject(err);
          } else {
            console.log(result);
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
  getHandles: function (username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT handle FROM cfhandles WHERE username = ?",
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
  insertHandle: function (userName, handle) {
    console.log(handle);
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO cfhandles (username, handle) VALUES (?, ?)",
        [userName, handle],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  clearHandle: function (userName) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM cfhandles WHERE username = ?",
        [userName],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  addPost: function (userName, title, post) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO posts (author, title,content) VALUES (?, ? , ?)",
        [userName, title, post],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getPosts: function () {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts ORDER BY id DESC", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  addComment: function (userName, comment, parent) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO comments (author, content,parent) VALUES (?, ? , ?)",
        [userName, comment, parent],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  addReply: function (userName, comment, parent) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO replies (author, content,parent) VALUES (?, ? , ?)",
        [userName, comment, parent],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getComment: function (id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM comments WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  getReply: function (id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM replies WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  getPost: function (id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getChildComments: function (par) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM comments WHERE parent = ? ORDER BY id DESC",
        [par],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getChildReplies: function (par) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM replies WHERE parent = ? ORDER BY id DESC",
        [par],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
