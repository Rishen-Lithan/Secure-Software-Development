const mongoose = require('mongoose');

// Connecting to the Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.error('Error connecting database : ', error);
    }
}

module.exports = connectDB;