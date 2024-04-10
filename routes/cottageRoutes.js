const express = require("express");
const cottageController = require("./../controllers/cottageController");
const router = express.Router();
const ensureLoggedIn = require("./../middlewares/ensureLogin")



// Get, update, and delete booking by ID
router
  .route("/:id")
  .get( cottageController.getCottage)
  .patch( cottageController.updateCottage)
  .delete( cottageController.deleteCottage);

// Get all bookings
router
  .route('/')
  .get( cottageController.getAllCottage)
  .post( cottageController.addCottage); 
  // Corrected method name

module.exports = router;
