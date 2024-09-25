const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');

const handleNewUser = async (req, res) => {
    const { email, pwd } = req.body;

    if(!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required'});

    // Backend Input Field Validations
    if (!validator.isEmail(email)) {
        return res.status(400).json({ 'message': 'Invalid email format' });
    }

    const passwordMinLength = 8;
    if (pwd.length < passwordMinLength) {
        return res.status(400).json({ 'message': `Password must be at least ${passwordMinLength} characters long` });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(pwd)) {
        return res.status(400).json({ 'message': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
    }

    // check duplicate usernames in the database
    const duplicate = await User.findOne({ email: email }); // exec
    if (duplicate) {
        return res.status(409).json({ 'message': 'Email is already in use' });
    }

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // create and store the new user
        const result = await User.create({
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };