const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectTestDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI_TEST);
        console.log('Test MongoDB connected successfully');
    } catch (error) {
        console.error('Test MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectTestDB;