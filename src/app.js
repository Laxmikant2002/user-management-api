require('dotenv').config();
const express = require('express');
const connectDB = require('../config/dbConfig'); // Import connectDB
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

// Connect to MongoDB if not in test environment
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);

// Only start the server if NOT in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app; // Export the app instance