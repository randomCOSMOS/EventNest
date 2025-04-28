const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

// Public
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);

// Admin only
router.post('/', authenticateToken, requireAdmin, eventController.createEvent);
router.put('/:id', authenticateToken, requireAdmin, eventController.updateEvent);
router.delete('/:id', authenticateToken, requireAdmin, eventController.deleteEvent);

module.exports = router;
