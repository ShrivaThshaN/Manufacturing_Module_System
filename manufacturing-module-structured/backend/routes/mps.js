const express = require("express");
const router = express.Router();
const mpsData = require("../data/mpsData.json");
router.get("/", (req, res) => {
  res.json(mpsData);
});
module.exports = router;