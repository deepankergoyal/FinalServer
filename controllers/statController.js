const Booking = require("./../models/bookingSchema");
const Cottage = require("./../models/cabinSchema");
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
    const cottages = await Cottage.find();
    const totalCapacity = cottages.reduce(
      (acc, cottage) => acc + cottage.maxCapacity,
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

    const occupancyRate =
      occupiedCapacity.length > 0
        ? ((occupiedCapacity[0].occupiedCapacity / totalCapacity) * 100).toFixed(2)
        : 0;
    res.json({
      totalBookings,
      totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,
      checkIns,
      occupancyRate,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
