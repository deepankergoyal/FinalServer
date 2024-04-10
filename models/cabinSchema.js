const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
    name: {type: String, required: true},
    maxCapacity: { type: Number, required: true },
    regularPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

const Cabin = mongoose.model('Cabin', cabinSchema);

module.exports = Cabin;
