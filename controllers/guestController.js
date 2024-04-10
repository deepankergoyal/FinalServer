const Guest = require("./../models/guestSchema");

// get all bookings

exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();

    res.status(200).json({
      status: "success",
      data: {
        guests,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Search guest by ID
exports.getGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.query.id);

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        guest,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Delete guest by ID
exports.deleteGuest = (req, res) => {
  const guestId = req.params.id;
  console.log(guestId)

  console.log("hitting delete" + guestId);
  Guest.findByIdAndRemove(guestId, (err, guest) => {
    if (err) {
      console.error("Error deleting guest:", err);
      res.status(500).send(err);
    } else if (!guest) {
      res.status(404).json({ message: "Guest not found" });
    } else {
      console.log("Guest deleted successfully:", guest);
      res.status(200).json({
        message: "Guest deleted successfully",
        data: {
          guest,
        },
      });
    }
  });
};

//add guest

exports.addGuest = async (req, res) => {
  try {
    const { fullName, email, nationality, countryFlag } = req.body;

    const newGuest = new Guest({
      fullName,
      email,
      nationality,
      countryFlag,
    });

    // Save the new guest to the database
    const savedGuest = await newGuest.save();

    res
      .status(201)
      .json({ message: "Guest added successfully", data: savedGuest });
  } catch (error) {
    console.error("Error adding guest:", error);
    res
      .status(500)
      .json({ message: "Error adding guest", error: error.message });
  }
};

// Update booking by ID
exports.updateGuest = (req, res) => {
  // Hardcoded guest ID as a string
  const guestId = req.params.id;
  const updatedData = req.body;
  console.log(guestId);
  console.log(updatedData);

  Guest.findByIdAndUpdate(
    guestId, // Use the hardcoded guestId here
    { $set: updatedData },
    { new: true },
    (err, guest) => {
      if (err) {
        console.error("Error updating guest:", err);
        res.status(500).send(err);
      } else if (!guest) {
        console.log("Guest not found");
        res.status(404).json({ message: "Guest not found" });
      } else {
        console.log("Guest updated successfully:", guest);
        res
          .status(200)
          .json({ message: "Guest updated successfully", data: { guest } });
      }
    }
  );
};
