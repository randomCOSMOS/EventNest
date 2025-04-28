const bookingModel = require('../models/bookingModel');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
