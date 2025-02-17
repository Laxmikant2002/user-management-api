const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware'); // Correct import
const { validateUser } = require('../middlewares/validationMiddleware'); // Import validateUser

const router = express.Router();

// Protected routes
router.post('/', verifyToken, validateUser, createUser); // Create User
router.get('/', verifyToken, getAllUsers); // Get All Users
router.get('/:id', verifyToken, getUserById); // Get Single User
router.put('/:id', verifyToken, validateUser, updateUser); // Update User
router.delete('/:id', verifyToken, checkRole('admin'), deleteUser); // Delete User (Admin only)

module.exports = router;