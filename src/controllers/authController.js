const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils'); // Import generateToken

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Remove manual hashing here
        const newUser = new User({ name, email, password }); // Let model hash
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) { // Handle duplicate email
            return res.status(400).json({ message: 'Email already exists' });
        }
        next(error); // Pass error to middleware
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user); // Use utility function
        res.status(200).json({ token });
    } catch (error) {
        next(error); // Pass error to middleware
    }
};