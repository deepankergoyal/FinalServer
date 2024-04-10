const Booking = require("./../models/bookingSchema");
const Cottage = require("./../models/cabinSchema"); // Update import to Cottage
const Guest = require("./../models/guestSchema");

exports.getData = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalSales = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$regularPrice" },
        },
      },
    ]);

    const checkIns = await Booking.countDocuments({
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
      isPaid: true,
    });
    const cottages = await Cottage.find(); // Change variable name to cottages
    const totalCapacity = cottages.reduce(
      // Change variable name to cottages
      (acc, cottage) => acc + cottage.maxCapacity, // Change variable name to cottage
      0
    );
    const occupiedCapacity = await Booking.aggregate([
      {
        $match: {
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        },
      },
      {
        $group: {
          _id: null,
          occupiedCapacity: { $sum: "$numGuests" },
        },
      },
    ]);

    // Check if occupiedCapacity has elements
    const occupancyRate =
      occupiedCapacity.length > 0
        ? (
            (occupiedCapacity[0].occupiedCapacity / totalCapacity) *
            100
          ).toFixed(2)
        : 0;
    res.json({
      totalBookings,
      totalSales: totalSales.length ? totalSales[0].totalSales : 0,
      checkIns,
      occupancyRate,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
