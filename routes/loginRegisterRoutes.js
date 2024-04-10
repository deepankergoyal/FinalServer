const express = require("express");
const loginRegisterController = require("./../controllers/loginRegisterController");
const ensureLoggedIn = require("./../middlewares/ensureLogin")


const router = express.Router();

// Define routes using the imported controller functions
router.post("/signup", loginRegisterController.signup);
router.post("/login", loginRegisterController.login);

module.exports = router;
