const express = require("express");
const statController = require("./../controllers/statController");
const router = express.Router();

router.route("/").get(statController.getData);

module.exports = router;
