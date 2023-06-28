const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");
const userController = require("../controllers/userController");

router.get("/", userController.auth, songController.songIndex);

module.exports = router;
