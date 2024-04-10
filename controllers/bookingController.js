const Booking = require("./../models/bookingSchema");

// get all bookings

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      status: "success",
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// add booking
exports.postBooking = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      cabinId,
      guestId,
      hasBreakfast,
      observations,
      isPaid,
      numGuests,
    } = req.body;

    const newBooking = new Booking({
      created_at: new Date(),
      startDate,
      endDate,
      cabinId,
      guestId,
      hasBreakfast,
      observations: observations || "", // default empty string if not provided
      isPaid,
      numGuests,
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking added successfully", data: savedBooking });
  } catch (error) {
    console.error("Error adding booking:", error);
    res
      .status(500)
      .json({ message: "Error adding booking", error: error.message });
  }
};

// Search booking by ID
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.query.id);

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Delete booking by ID
exports.deleteBooking = (req, res) => {
  const bookingId = req.params.id;

  Booking.findByIdAndRemove(bookingId, (err, booking) => {
    if (err) {
      console.error("Error deleting booking:", err);
      res.status(500).send(err);
    } else if (!booking) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      console.log("Booking deleted successfully:", booking);
      res.status(200).json({
        message: "Booking deleted successfully",
        data: {
          booking,
        },
      });
    }
  });
};

exports.updateBooking = (req, res) => {
  const bookingId = req.params.id;
  console.log("booking id ", bookingId);
  const updatedData = req.body;

  Booking.findByIdAndUpdate(
    bookingId,
    { $set: updatedData },
    { new: true },
    (err, booking) => {
      if (err) {
        console.error("Error updating booking:", err);
        return res.status(500).send(err);
      } else if (!booking) {
        console.log("Booking not found");
        return res.status(404).json({ message: "Booking not found" });
      } else {
        console.log("Booking updated successfully:", booking);
        return res
          .status(200)
          .json({ message: "Booking updated successfully", data: { booking } });
      }
    }
  );
};
