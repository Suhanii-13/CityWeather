const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");


router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const Newuser = new User({ username });
      await User.register(Newuser, password);
  
      res.status(200).json({ message: 'User registered successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user.', error: err.message });
    }
  });

  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: 'Logged in successfully' });
  });
  
  router.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ message: 'Logout failed', error: err.message });
        }
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ message: 'Session destruction failed', error: err.message });
          }
          res.clearCookie('connect.sid'); 
          res.status(200).json({ message: 'Logged out successfully' });
        });
      });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  });

  module.exports = router ;