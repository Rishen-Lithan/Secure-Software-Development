const express = require("express");
const router = express.Router();
const User = require('../models/userModels')

// API Route for Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email, password: password });
  
      if (user) {
        const temp = {
          name: user.name,
          email: user.email,
        //   role: user.role,
          _id: user._id,
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: "Login Failed" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

// API Route for Signup
router.post("/register", async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  
    try {
      const newUser = await user.save();
      res.send("User Registered Successfully");
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

module.exports = router;