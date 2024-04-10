const express = require("express");
const bookingController = require("./../controllers/bookingController");
const router = express.Router();
const ensureLoggedIn = require("./../middlewares/ensureLogin")

// Get, update, and delete booking by ID
router
  .route("/:id")
  .get( bookingController.getBooking)
  .patch( bookingController.updateBooking)
  .delete( bookingController.deleteBooking);

// Get all bookings
router
  .route('/')
  .get( bookingController.getAllBookings)
  .post( bookingController.postBooking); 

module.exports = router;
