const User = require('../models/userModel');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(200).json({ message: 'User logged out successfully' });
    const refreshToken = cookies.jwt;

    // Is refreshToken in db ?
    const foundUser = await User.findOne({ refreshToken }); //.exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({ message: 'User logged out successfully' });
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure true - only serves on https
    res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = { handleLogout };