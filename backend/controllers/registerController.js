const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, pwd } = req.body;

    if(!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required'});

    // check duplicate usernames in the database
    const duplicate = await User.findOne({ email: email }); // exec
    if(duplicate) return res.sendStatus(409);

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