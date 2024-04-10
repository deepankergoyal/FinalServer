const Cottage = require("./../models/cabinSchema");

// get all cottages

exports.getAllCottage = async (req, res) => {
  try {
    const cottages = await Cottage.find();

    res.status(200).json({
      status: "success",
      data: {
        cottages,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Search booking by ID
exports.getCottage = async (req, res) => {
  try {
    const cottage = await Cottage.findById(req.query.id);

    if (!cottage) {
      return res.status(404).json({
        status: "failed",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        cottage,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// add cottage
exports.addCottage = async (req, res) => {
  try {
    const { name, maxCapacity, regularPrice, discount, image, description } =
      req.body;

    const newCottage = new Cottage({
      name,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });

    // Save the new cabin to the database
    const saveCottage = await newCottage.save();

    res
      .status(201)
      .json({ message: "Cabin added successfully", data: saveCottage });
  } catch (error) {
    console.error("Error adding cabin:", error);
    res
      .status(500)
      .json({ message: "Error adding cabin", error: error.message });
  }
};

// Delete cottage by ID
exports.deleteCottage = (req, res) => {
  const cottageId = req.params.id; // Assuming bookingId is provided in the query string

  Cottage.findByIdAndRemove(cottageId, (err, cottage) => {
    if (err) {
      console.error("Error deleting cottage:", err);
      res.status(500).send(err);
    } else if (!cottage) {
      res.status(404).json({ message: "cottage not found" });
    } else {
      console.log("cottage deleted successfully:", cottage);
      res.status(200).json({
        message: "cottage deleted successfully",
        data: {
          cottage,
        },
      });
    }
  });
};

/// Update cottage by ID
exports.updateCottage = (req, res) => {
  const cottageId = req.params.id; // Assuming cottageId is provided in the request params
  const updatedData = req.body;
  console.log("Updated", updatedData);
  console.log("ID here", cottageId);

  Cottage.findByIdAndUpdate(
    cottageId,
    { $set: updatedData },
    { new: true },
    (err, cottage) => {
      if (err) {
        console.error("Error updating cottage:", err);
        res.status(500).send(err);
      } else if (!cottage) {
        console.log("Cottage not found");
        res.status(404).json({ message: "Cottage not found" });
      } else {
        console.log("Cottage updated successfully:", cottage);
        res
          .status(200)
          .json({ message: "Cottage updated successfully", data: { cottage } });
      }
    }
  );
};
