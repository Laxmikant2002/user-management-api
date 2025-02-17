const User = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { name, email, role } = req.body;
        const defaultPassword = 'defaultPassword'; 
        // Remove manual hashing here
        const newUser = new User({ name, email, role, password: defaultPassword }); // Let model hash
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        next(error); // Pass error to middleware
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users }); // Wrap in object
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user }); // Wrap in object
    } catch (error) {
        next(error); // Pass error to middleware
    }
};

// Update a user by ID
exports.updateUser = async (req, res, next) => {
    try {
        const { name, email, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        next(error); // Pass error to middleware
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error); // Pass error to middleware
    }
};