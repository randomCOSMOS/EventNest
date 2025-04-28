const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await userModel.findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token, user: { id: user.id, email: user.email, is_admin: user.is_admin } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
