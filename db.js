// /config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected successfully.');
    } catch (err) {
        console.error(`❌ DB Connection Error: ${err.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;