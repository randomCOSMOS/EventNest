const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

router.get('/bookings', authenticateToken, requireAdmin, adminController.getAllBookings);

module.exports = router;
