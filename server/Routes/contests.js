const express = require("express");
const router = express.Router();
const queries = require("../queries");
const helper = require("../helper");
require("dotenv").config();

router.post("/getNationalContests", async (req, res) => {
  queries
    .getNationalContests()
    .then((result) => {
      let contests = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        contests.push({
          id: element.id,
          name: element.name,
          time: element.time,
        });
      });
      res.send(contests);
    })
    .catch((err) => res.send(err));
});
router.post("/getNaionalContest", async (req, res) => {
  queries
    .getNationalContest()
    .then((result) => {
      let contests = [];
      result = Object.values(JSON.parse(JSON.stringify(result)));
      result.forEach((element) => {
        contests.push({
          id: element.id,
          name: element.name,
          time: element.time,
        });
      });
      if (contests.length === 0) res.send("1");
      else res.send(contests[0]);
    })
    .catch((err) => res.send(err));
});
router.post("/addNationalContest", async (req, res) => {
  let token = req.body.token;
  let data = helper.decryptData(token, process.env.SECRET_KEY);
  if (data) {
    queries
      .addNationalContest(req.body.name, req.body.time)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send("1"));
  } else res.send("1");
});

module.exports = router;
