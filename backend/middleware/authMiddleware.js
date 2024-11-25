// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Role-checking middlewares
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') return res.status(403).json({ message: 'Super Admins only.' });
  next();
};

const isAdminOrSuperAdmin = (req, res, next) => {
  if (!['admin', 'superadmin'].includes(req.user.role)) return res.status(403).json({ message: 'Admins only.' });
  next();
};

module.exports = { authMiddleware, isSuperAdmin, isAdminOrSuperAdmin };
