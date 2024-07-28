const express= require("express");
const mongoose = require("mongoose");
const session=require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

main()
  .then(console.log("connected to db"))
  .catch(err=>console.log(err));

  async function main()
  {
    await mongoose.connect("mongodb://127.0.0.1:27017/weatherApp")
  }


app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
  secret: 'yourSecrbdhfdsfiuyfiuyso4yetKey', // Replace with a strong secret key
  resave: false, // Avoid resaving unchanged sessions
  saveUninitialized: false, // Save only initialized sessions
  cookie:
  {
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));


  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


  app.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const Newuser = new User({ username });
      await User.register(Newuser, password);
  
      res.status(200).json({ message: 'User registered successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user.', error: err.message });
    }
  });

  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: 'Logged in successfully' });
  });
  
  app.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ message: 'Logout failed', error: err.message });
        }
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ message: 'Session destruction failed', error: err.message });
          }
          res.clearCookie('connect.sid'); // Adjust if needed
          res.status(200).json({ message: 'Logged out successfully' });
        });
      });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  });

  app.post('/addcity', async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const user = req.user;
        const { city } = req.body;
        if (!user.cities.includes(city)) {
          user.cities.push(city);
          await user.save();
        }
        res.status(200).json({ message: 'City added successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error adding city', error: err.message });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  });
  
  // Route to get user's cities
  app.get('/cities', async (req, res) => {
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


  // Route to delete all cities
app.post('/deleteallcities', async (req, res) => {
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

app.listen(port , () =>{
    console.log("Server is running..")
})


