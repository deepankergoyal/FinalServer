const express = require("express");
const guestController = require("./../controllers/guestController");
const router = express.Router();
const ensureLoggedIn = require("./../middlewares/ensureLogin")


// Get, update, and delete booking by ID
router
  .route("/:id")
  .get(guestController.getGuest)
  .patch( guestController.updateGuest)
  .delete( guestController.deleteGuest);

// Get all bookings
router
  .route('/')
  .get( guestController.getAllGuests)
  .post(guestController.addGuest); 

module.exports = router;
