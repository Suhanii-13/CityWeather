const express = require("express");
const router = express.Router();


router.post('/addcity', async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const user = req.user;
        const { city } = req.body;
        if (!user.cities.includes(city)) {
          user.cities.push(city);
          await user.save();
        }
      } catch (err) {
        res.status(500).json({ message: 'Error adding city', error: err.message });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  });
  

  router.get('/cities', async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const user = req.user;
        res.status(200).json(user.cities);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching cities', error: err.message });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  });


  router.post('/deleteallcities', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = req.user;
      user.cities = [];
      await user.save();
      res.status(200).json({ message: 'All cities deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting cities', error: err.message });
    }
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});


module.exports = router ;