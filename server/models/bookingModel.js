const pool = require('../db');

exports.createBooking = async ({ user_id, event_id, paid = false }) => {
  const res = await pool.query(
    'INSERT INTO bookings (user_id, event_id, paid) VALUES ($1, $2, $3) RETURNING *',
    [user_id, event_id, paid]
  );
  return res.rows[0];
};

exports.getBookingsByUser = async (user_id) => {
  const res = await pool.query(
    'SELECT b.*, e.title, e.date, e.location FROM bookings b JOIN events e ON b.event_id = e.id WHERE b.user_id = $1',
    [user_id]
  );
  return res.rows;
};

exports.getAllBookings = async () => {
  const res = await pool.query('SELECT * FROM bookings');
  return res.rows;
};

exports.deleteBooking = async (id) => {
  await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
};
