const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Newly created user model
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model("Users", userSchema);