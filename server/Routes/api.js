const express = require("express");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
require("dotenv").config();
router.get("/", (req, res) => {
  res.send({ data: "that's what you get" });
});
router.post("/getUser", (req, res) => {
  let username = req.body.user;
  let userExists = queries.getlogininfoByUsername(username);
  userExists
    .then(async (result) => {
      if (result.length === 0) {
        res.send("1");
      } else {
        let studentinfo = queries.getStudentInfo(username);
        studentinfo
          .then((student) => {
            if (student.length === 0) {
              res.send("3");
            } else {
              let handles = queries.getHandles(username);
              handles
                .then((cfhandles) => {
                  let user = {
                    userName: result[0].username,
                    email: result[0].email,
                    name: student[0].name,
                    phone: student[0].phoneNo,
                    reg: student[0].regNo,
                    handles: [],
                  };
                  cfhandles = Object.values(
                    JSON.parse(JSON.stringify(cfhandles))
                  );
                  cfhandles.forEach((element) => {
                    user.handles.push(element.handle);
                  });
                  res.send(user);
                })
                .catch(() => {});
            }
          })
          .catch(() => {
            res.send("3");
          });
      }
    })
    .catch((err) => {
      res.send("3");
    });
});
router.post("/updateHandles", async (req, res) => {
  let handles = req.body.handles;
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  let cnt = handles.length;
  if (data) {
    queries.clearHandle(data.userName);
    handles.forEach((handle) => {
      queries
        .insertHandle(data.userName, handle)
        .then((result) => {
          cnt--;
          if (cnt === 0) res.send("1");
        })
        .catch((err) => {
          cnt--;
          if (cnt == 0) res.send("1");
        });
    });
  }
  res.send("1");
});

module.exports = router;
