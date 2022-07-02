const express = require("express");
const router = express.Router();
router.get("/" , (req , res) => {
    res.send({data:"that's what you get"});
});

module.exports = router;