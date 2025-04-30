const eventModel = require('../models/eventModel');
const pool = require('../db');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, date, price } = req.body;
    const event = await eventModel.createEvent({
      title, description, location, date, price, created_by: req.user.id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await eventModel.getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getParticipantsForEvent = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  // Fetch the event object
  const eventRes = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
  const event = eventRes.rows[0];
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.created_by !== userId) {
    return res.status(403).json({ message: 'Only the event creator can view participants.' });
  }

  // Get participants (users who booked this event)
  const bookingsRes = await pool.query(
    `SELECT u.id, u.name, u.email 
     FROM bookings b 
     JOIN users u ON b.user_id = u.id 
     WHERE b.event_id = $1`,
    [eventId]
  );
  console.log(bookingsRes.rows);
  res.json(bookingsRes.rows);
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await eventModel.updateEvent(req.params.id, req.body);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await eventModel.deleteEvent(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
