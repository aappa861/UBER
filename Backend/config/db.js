const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
    
         mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,})
        .then(() => {
        console.log('MongoDB connected successfully');})
         .catch ((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
)}