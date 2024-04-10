const express = require("express");
const webController = require("./../controllers/webControllerById");
const router = express.Router();

//Auth middleware
const ensureLoggedIn = (req, res, next) => {
  console.log("ensureLoggedIn middleware called");
  console.log("sessiondddd   " + req.session.user);
  if (req.session && req.session.user) {
    console.log("User is logged in");
    next();
  } else {
    console.log("User is not logged in. Redirecting to /login");
    res.redirect('/login');
  }
};

// Get, update, and delete booking by ID
router
  .route("/:id")
  .get(ensureLoggedIn, webController.getBooking)
  .post(ensureLoggedIn, webController.updateBooking)
  .delete(ensureLoggedIn, webController.deleteBooking);

// Get all bookings
router
  .route('/')
  .get(webController.getAllBookings); // Corrected method name

module.exports = router;
