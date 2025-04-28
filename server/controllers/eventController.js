const eventModel = require('../models/eventModel');

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
