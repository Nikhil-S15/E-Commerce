const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    const url = process.env.MONGO_URL || process.env.DB_URL;
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
}

module.exports = connectDB;
