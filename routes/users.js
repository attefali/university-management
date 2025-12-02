const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Routes
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
