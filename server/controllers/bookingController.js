const bookingModel = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  try {
    const { event_id } = req.body;
    // Payment logic would go here
    const booking = await bookingModel.createBooking({ user_id: req.user.id, event_id, paid: true });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getBookingsByUser(req.user.id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await bookingModel.deleteBooking(req.params.id);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
