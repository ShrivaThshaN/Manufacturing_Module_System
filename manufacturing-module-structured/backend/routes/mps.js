const express = require("express");
const router = express.Router();
const { getMpsData } = require("../controllers/mpsController");

// When hitting /api/mps, call the controller
router.get("/", getMpsData);

module.exports = router;
