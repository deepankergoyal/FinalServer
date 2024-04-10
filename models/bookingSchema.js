const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    created_at: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    cabinId: { type: Number, required: true },
    guestId: { type: Number, required: true },
    hasBreakfast: { type: Boolean, required: true },
    observations: { type: String, default: "" },
    isPaid: { type: Boolean, required: true },
    numGuests: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
