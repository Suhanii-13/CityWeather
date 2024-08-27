require('dotenv').config()
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
    await mongoose.connect(process.env.mongo_url)
  }


app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
  secret:process.env.SECRET_KEY, 
  resave: false, 
  saveUninitialized: false,
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
  origin:process.env.CLIENT_URL,
  credentials: true,
  }));


  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


  const userRouter = require("./routes/user.js");
  const cityRouter = require("./routes/city.js")
  
  app.use("/" , userRouter);
  app.use("/" , cityRouter);


app.listen(port , () =>{
    console.log("Server is running..")
})


